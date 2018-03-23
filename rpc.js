const {createServer} = require('rpc');

const methods = [];
const json_response = (data = {}) => JSON.stringify(data);
const add_method = (name, func) => methods.push({name, func});
const find_method = (name) => methods.find(item => item.name === name);

const create_rpc_server = createServer((req, res) => {
  if (req.method !== 'POST') return res.end("Method Not Allowed");

  res.setHeader('Content-Type', 'application/json');
  let req_body;
  req.on('data', (data) => req_body = data);
  req.on('end', () => {
    const {method, params} = JSON.parse(req_body);
    if (!method) return res.end("Method required");
    if (!params) return res.end("Params required");

    const {func} = find_method(method);
    if (!func) return res.end("Method not found");

    func(params)
      .then(response => res.end(json_response({result: response, error: {}})))
      .catch(error => res.end(json_response({result: {}, error})))
  });
});


module.exports = {
  add_method, create_rpc_server
};

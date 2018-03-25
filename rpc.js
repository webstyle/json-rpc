const { createServer } = require('http');

const methods = [];
const json_response = (data = {}) => JSON.stringify(data);
const add_method = (name, func) => methods.push({name, func});
const find_method = (name) => methods.find(item => item.name === name);
const error = (data) => Promise.reject(data);

const create_rpc_server = createServer((req, res) => {
  if (req.method !== 'POST') {
    res.statusCode = 403;
    return res.end("Method Not Allowed");
  }

  res.setHeader('Content-Type', 'application/json');
  let req_body;
  req.on('data', (data) => req_body = data);
  req.on('end', async () => {
    const { method, params } = JSON.parse(req_body);
    if (!method) return res.end(json_response({error: { message: "Method required", code: -32700 }}));
    if (!params) return res.end(json_response({ error: { message: "Params required", code: -32700 } }));

    const {func} = find_method(method);
    if (!func) return res.end(json_response({ error: { message: "Method not found", code: -32601}}));

    try {
      const response = await func(params);
      return res.end(json_response({result: response, error: {}}));
    } catch(error) {
      return res.end(json_response({result: {}, error}));
    }
  });
});


module.exports = {
  add_method, create_rpc_server, error
};

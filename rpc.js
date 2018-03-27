const { createServer } = require('http');
const net = require('net');

const methods = [];
const json_response = (data = {}) => JSON.stringify(data);
const add_method = (name, func) => methods.push({name, func});
const find_method = (name) => methods.find(item => item.name === name) || { func: null, method: null };
const send_error = (data) => Promise.reject(data);
const method_required = () => json_response({error: { message: "Method required", code: -32700 }}); 
const params_required = () => json_response({ error: { message: "Params required", code: -32700 }});
const method_not_found = () => json_response({ error: { message: "Method not found", code: -32601}});

const http_server = createServer((req, res) => {
  if (req.method !== 'POST') {
    res.statusCode = 403;
    return res.end("Method Not Allowed");
  }

  res.setHeader('Content-Type', 'application/json');
  let req_body;
  req.on('data', (data) => req_body = data);
  req.on('end', async () => {
    const { method, params } = JSON.parse(req_body);
    if (!method) return res.end(method_required());
    if (!params) return res.end(params_required());

    const { func } = find_method(method);
    if (func === null) return res.end(method_not_found());

    try {
      const response = await func(params);
      return res.end(json_response({result: response, error: {}}));
    } catch(error) {
      return res.end(json_response({result: {}, error}));
    }
  });
});

const tcp_server = net.createServer(c => {
  console.log('client connected');
  c.on('data', async data => {
    const { method, params } = JSON.parse(data.toString());
    if (!method) return c.write(method_required());
    if (!params) return c.write(params_required());

    const { func } = find_method(method);
    if (func === null) return c.write(method_not_found());

    try {
      const response = await func(params);
      return c.write(json_response({method, result: response, error: {}}));
    } catch(error) {
      return c.write(json_response({method, result: {}, error}));
    }
  });
});


module.exports = {
  add_method, http_server, send_error, tcp_server
};

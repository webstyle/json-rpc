**JSON RPC 2.0 Server without npm packages.**
--
You can use ES6 Promises, Async/Await.

Server example:
```js
const {add_method, create_rpc_server} = require('./rpc');

add_method('add', async (args) => {
  return args[0] + args[1];
});

add_method('subtract', async (args) => {
  return args[0] - args[1];
});


create_rpc_server.listen(3000, () => {
  console.log('JSON RPC Server is run on port 3000');
});
```

**Method definition**
```js
const { add_method } = require('./rpc');

add_method('method_name', async (args) => {
  // your code 
  // you must return data
  
  return {};
});
```

**Server Errors**
--
If you should like to return an error from an method request to indicate a failure. You can use `send_error` function and send error object. [JSON RPC 2.0 error object specification](http://www.jsonrpc.org/specification#error_object). 
```js
const { send_error } = require('./rpc');

add_method('method_name', async (args) => {
  return send_error({ message: "error_message", code: -32603});
});
```
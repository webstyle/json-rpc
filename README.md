**My JSON RPC server example**

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
```js
const { error } = require('./rpc');

add_method('method_name', async (args) => {
  return error({ message: "error_message", code: -32603});
});
```
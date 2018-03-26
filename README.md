**JSON RPC 2.0 Server without npm packages.**
--
You can use Promises, Async/Await.

HTTP Server example:
```js
const { add_method, http_server } = require('./rpc');

add_method('add', async (args) => args[0] + args[1]);

add_method('subtract', async (args) =>  args[0] - args[1]);

http_server.listen(3000, () => {
  console.log('JSON RPC Server is run on port 3000');
});
```
--
TCP Server example
```js
const { add_method, tcp_server } = require('./rpc');

add_method('add', async (args) => args[0] + args[1]);

add_method('subtract', async (args) =>  args[0] - args[1]);

tcp_server.listen(8124);
console.log('JSON RPC TCP Server is run on port 8124');
```

**Installation**
--
Quick guide:
```bash
# Clone repository
$ git clone https://github.com/WebStyle/json-rpc.git

# Change directory
$ cd json-rpc

# Then simply start your app
$ npm start
```


**Method definition example**
--
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
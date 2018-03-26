const { add_method, http_server, tcp_server } = require('./rpc');

add_method('add', async (args) => args[0] + args[1]);

add_method('subtract', async (args) =>  args[0] - args[1]);

http_server.listen(3000, () => {
  console.log('JSON RPC Server is run on port 3000');
});

tcp_server.listen(8124);
console.log('JSON RPC TCP Server is run on port 8124');
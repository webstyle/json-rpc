const {add_method, create_rpc_server} = require('./rpc');

add_method('add', async (args) => {
  return args[0] + args[1];
});

add_method('subtract', async (args) => {
  return Promise.reject({message: "some error"});
});


create_rpc_server.listen(3000, () => {
  console.log('JSON RPC Server is run on port 3000');
});
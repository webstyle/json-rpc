const tcp_client = require('./rpc_client');

// Entry point
(async () => {
    const client = new tcp_client({ port: 8124 })

    let response = await client.request("add", [1, 6]);
    console.log(response);
})();

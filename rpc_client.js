const net = require('net');

class tcp_client {
    constructor({ host = 'localhost', port }) {
        this.clinet = net.createConnection({ port, host }, (err) => {
            if (err) throw err;
        });
    }
    request(method_name, params) {
        return new Promise((resolve, reject) => {
            this.clinet.write(JSON.stringify({ method: method_name, params }), (err) => {
                if (err) reject(err);
            });
            this.clinet.on('data', async (data) => {
                const { method = '', result = {}, error = {} } = JSON.parse(data.toString());
                if (method === method_name) return resolve({ result, error });
            });
        })

    }
}


module.exports = tcp_client;
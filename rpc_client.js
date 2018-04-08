const net = require('net');
const http = require('http');

class tcp_client {
    constructor({ host = 'localhost', port }) {
        this.clinet = net.createConnection({ port, host }, (err) => {
            if (err) throw err;
        });
    }
    async request(method_name, params) {
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

class http_client {
    constructor({ host = `http://localhost`, port }) {
        this.host = host;
        if (!port) throw new Error(`port is required`);
        this.port = port;
    }
    async request(method, params) {
        const options = {
            hostname: this.host,
            port: this.port,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        return new Promise((resolve, reject) => {
            const req = http.request({ options }, async res => {
                res.setEncoding(`utf-8`);
                res.on(`data`, chunk => resolve(JSON.parse(chunk)));
            });
            req.write({ method, params });
        });
    }
}


module.exports.tcp_client = tcp_client;
module.exports.http_client = http_client;
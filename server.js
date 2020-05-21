require('dotenv').config();
const http = require('http');
const url = require('url');

const { signup } = require('./app/modules/signup/signup.controller');
const { login } = require('./app/modules/login/login.controller');

const server = http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    req.body = '';
    req.on('data', (chunk) => {
        req.body += chunk;
    });
    req.on("end", () => {
        req.body = req.body ? JSON.parse(req.body) : {};
        res.setHeader('Content-Type', 'application/json');

        if (path == '/signup' && req.method === 'POST') {
            signup(req, res);
        } else if (path == '/login' && req.method === 'POST') {
            login(req, res);
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ status: 404, message: 'Not Found', data: null }));
        }
    });
});

server.listen(process.env.PORT || 3000, () =>
    console.log(`Server is listening on port ${process.env.PORT || 3000}.`)
);

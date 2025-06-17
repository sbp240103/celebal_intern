const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    const filename = query.name ? path.join(__dirname, query.name) : null;

    if (pathname === '/create') {
        if (!filename || !query.content) {
            res.writeHead(400);
            return res.end('Missing file name or content');
        }
        fs.writeFile(filename, query.content, (err) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error writing file');
            }
            res.writeHead(200);
            res.end(`File '${query.name}' created`);
        });
    }

    else if (pathname === '/read') {
        if (!filename) {
            res.writeHead(400);
            return res.end('Missing file name');
        }
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404);
                return res.end('File not found');
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        });
    }

    else if (pathname === '/delete') {
        if (!filename) {
            res.writeHead(400);
            return res.end('Missing file name');
        }
        fs.unlink(filename, (err) => {
            if (err) {
                res.writeHead(404);
                return res.end('File not found');
            }
            res.writeHead(200);
            res.end(`File '${query.name}' deleted`);
        });
    }

    else {
        res.writeHead(404);
        res.end('Invalid route. Use /create, /read, or /delete');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

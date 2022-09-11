import fs from 'node:fs';
import http from 'node:http';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

http
  .createServer((request, response) => {
    function render(filePath) {
      const extname = String(path.extname(filePath)).toLowerCase();
      const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm',
      };

      const contentType = mimeTypes[extname] ?? 'application/octet-stream';

      fs.readFile(filePath, (error, content) => {
        if (error) {
          if (error.code === 'ENOENT') {
            fs.readFile('./404.html', (err, cont) => {
              response.writeHead(404, { 'Content-Type': 'text/html' });
              response.end(cont, 'utf-8');
            });
          } else {
            response.writeHead(500);
            response.end(
              `Sorry, check with the site admin for error: ${error.code} ..\n`,
            );
          }
        } else {
          response.writeHead(200, { 'Content-Type': contentType });
          response.end(content, 'utf-8');
        }
      });
    }

    function custRender(filePath) {
      const extname = String(path.extname(filePath)).toLowerCase();
      const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm',
      };

      const contentType = mimeTypes[extname] ?? 'application/octet-stream';
      fs.readFile(path.resolve(dirName, filePath), (error, content) => {
        if (error) {
          if (error.code === 'ENOENT') {
            fs.readFile('./404.html', (err, cont) => {
              response.writeHead(404, { 'Content-Type': 'text/html' });
              response.end(cont, 'utf-8');
            });
          } else {
            response.writeHead(500);
            response.end(
              `Sorry, check with the site admin for error: ${error.code} ..\n`,
            );
          }
        } else {
          response.writeHead(200, { 'Content-Type': contentType });
          response.end(content, 'utf-8');
        }
      });
    }

    let filePath2 = `.${request.url}`;
    console.log(`request ${request.url}`);
    console.log(dirName);

    if (filePath2 === './') {
      filePath2 = './index.html';
      // initialise readfile as normal
      render(filePath2);
    } else if (filePath2.includes('/', 2)) {
      // if filepath includes two forward slashes, it's a directory (conceivably...)
      // initialise readfile: custom directory finding edition
      custRender(filePath2);
    } else {
      // initialise readfile as normal
      render(filePath2);
    }
  })
  .listen(8125);
console.log('Server running at http://127.0.0.1:8125/');

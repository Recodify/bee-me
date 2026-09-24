'use strict';

// Local preview only. Deploy the generated dist directory to a static web host.
const http = require('node:http');
const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');
const { pipeline } = require('node:stream/promises');

const root = path.resolve(__dirname, '../dist');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8' };

async function serve(request, response) {
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow: 'GET, HEAD' }); response.end(); return;
  }
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); }
  catch { response.writeHead(400); response.end('Invalid URL'); return; }
  if (pathname.includes('\0') || pathname.includes('\\')) { response.writeHead(400); response.end('Invalid path'); return; }
  let file = path.resolve(root, `.${pathname}`);
  if (file !== root && !file.startsWith(root + path.sep)) { response.writeHead(403); response.end('Forbidden'); return; }
  let status = 200;
  try {
    const stat = await fsp.stat(file);
    if (stat.isDirectory()) {
      if (!pathname.endsWith('/')) {
        response.writeHead(308, { Location: `${encodeURI(pathname)}/${new URL(request.url, 'http://localhost').search}` }); response.end(); return;
      }
      file = path.join(file, 'index.html');
    }
    const actual = await fsp.realpath(file);
    if (!actual.startsWith(root + path.sep)) { response.writeHead(403); response.end('Forbidden'); return; }
    await fsp.access(file);
  } catch {
    status = 404;
    file = path.join(root, '404.html');
  }
  try {
    const stat = await fsp.stat(file);
    response.writeHead(status, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Content-Length': stat.size, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    if (request.method === 'HEAD') response.end();
    else await pipeline(fs.createReadStream(file), response);
  } catch {
    if (!response.headersSent) response.writeHead(500);
    response.end('Preview files unavailable. Run npm run build first.');
  }
}

if (require.main === module) {
  const port = Number(process.env.PORT || 4173);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT must be between 1 and 65535.');
  http.createServer((request, response) => { serve(request, response).catch(() => { response.destroy(); }); })
    .listen(port, '127.0.0.1', () => process.stdout.write(`Preview: http://127.0.0.1:${port}\n`));
}

module.exports = { serve };

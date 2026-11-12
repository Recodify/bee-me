'use strict';

const fs = require('node:fs/promises');
const path = require('node:path');
const { getPages } = require('../src/templates/pages.cjs');
const { layout, escape } = require('../src/templates/components.cjs');

const root = path.resolve(__dirname, '..');

async function build({ output = path.join(root, 'dist'), origin = 'https://bee-me.ltd', indexable = false } = {}) {
  const siteUrl = new URL(origin);
  if (!['https:', 'http:'].includes(siteUrl.protocol) || siteUrl.pathname !== '/' || siteUrl.search || siteUrl.hash || siteUrl.username || siteUrl.password) {
    throw new Error('SITE_URL must be an HTTP(S) origin without a path, query, credentials or fragment.');
  }
  const pages = getPages({ showSamples: !indexable });
  const seen = new Set();
  for (const page of pages) {
    if (!/^\/(?:[a-z0-9-]+\/)*$/.test(page.path) || seen.has(page.path)) throw new Error(`Invalid or duplicate page path: ${page.path}`);
    seen.add(page.path);
  }
  await fs.mkdir(output, { recursive: true });
  await fs.cp(path.join(root, 'public'), output, { recursive: true, filter: source => !['bee-logo.png', 'bee-logo.webp', 'logo.webp'].includes(path.basename(source)) });
  for (const page of pages) {
    const file = page.path === '/404/' ? path.join(output, '404.html') : path.join(output, page.path.slice(1), 'index.html');
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, layout({ ...page, origin: siteUrl.origin, indexable }));
  }
  const urls = pages.filter(page => page.path !== '/404/').map(page => `  <url><loc>${escape(siteUrl.origin + page.path)}</loc></url>`).join('\n');
  await fs.writeFile(path.join(output, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  await fs.writeFile(path.join(output, 'robots.txt'), indexable ? `User-agent: *\nAllow: /\nSitemap: ${siteUrl.origin}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n');
  return { output, pages: pages.length };
}

if (require.main === module) {
  build({ origin: process.env.SITE_URL || 'https://bee-me.ltd', indexable: process.env.SITE_INDEXABLE === '1' })
    .then(result => process.stdout.write(`Built ${result.pages} pages in ${result.output}\n`))
    .catch(error => { process.stderr.write(`${error.message}\n`); process.exitCode = 1; });
}

module.exports = { build };

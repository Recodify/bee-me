'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { build } = require('../scripts/build.cjs');
const { getPages } = require('../src/templates/pages.cjs');

async function temporaryBuild(context, options = {}) {
  const output = await fs.mkdtemp(path.join(os.tmpdir(), 'work-solutions-test-'));
  context.after(() => fs.rm(output, { recursive: true, force: true }));
  await build({ output, ...options });
  return output;
}

test('all generated pages have valid local destinations, metadata and a single main heading', async context => {
  const output = await temporaryBuild(context);
  const titles = new Set();
  for (const page of getPages()) {
    const file = page.path === '/404/' ? '404.html' : `${page.path.slice(1)}index.html`;
    const html = await fs.readFile(path.join(output, file), 'utf8');
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, page.path);
    assert.match(html, /<html lang="en-GB">/);
    assert.match(html, /<meta name="description" content="[^"]+">/);
    assert.match(html, /<meta name="robots" content="noindex,follow">/);
    const title = html.match(/<title>(.*?)<\/title>/)[1];
    assert.ok(!titles.has(title), `Repeated title: ${title}`);
    titles.add(title);
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length, `Duplicate IDs: ${page.path}`);
    for (const [, reference] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
      if (reference.startsWith('#')) {
        assert.ok(ids.includes(reference.slice(1)), `Missing anchor: ${reference}`);
      } else if (reference.startsWith('/')) {
        const pathname = reference.split(/[?#]/)[0];
        const target = path.join(output, pathname.slice(1), pathname.endsWith('/') ? 'index.html' : '');
        await assert.doesNotReject(fs.access(target), `${page.path} links to missing ${reference}`);
      }
    }
    for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
      assert.match(tag, /\balt="[^"]*"/, `Missing alt: ${page.path}`);
      assert.match(tag, /\bwidth="\d+"/);
      assert.match(tag, /\bheight="\d+"/);
    }
  }
});

test('production metadata uses the configured origin and excludes the not-found page from the sitemap', async context => {
  const output = await temporaryBuild(context, { origin: 'https://example.com', indexable: true });
  const home = await fs.readFile(path.join(output, 'index.html'), 'utf8');
  assert.match(home, /content="index,follow"/);
  assert.match(home, /rel="canonical" href="https:\/\/example.com\/"/);
  const sitemap = await fs.readFile(path.join(output, 'sitemap.xml'), 'utf8');
  assert.equal((sitemap.match(/<url>/g) || []).length, getPages().length - 1);
  assert.ok(!sitemap.includes('/404/'));
  assert.match(await fs.readFile(path.join(output, '404.html'), 'utf8'), /content="noindex,follow"/);
  assert.match(await fs.readFile(path.join(output, 'robots.txt'), 'utf8'), /Sitemap: https:\/\/example.com\/sitemap.xml/);
});

test('contact page offers a truthful email handoff and labels every enquiry field', async context => {
  const output = await temporaryBuild(context);
  const html = await fs.readFile(path.join(output, 'contact/index.html'), 'utf8');
  assert.match(html, /Nothing has been sent/);
  assert.match(html, /<noscript>.*mailto:admin@worksolutions.ltd/s);
  for (const [, id] of html.matchAll(/<(?:input|textarea|select)\b[^>]*\bid="([^"]+)"/g)) {
    assert.ok(html.includes(`for="${id}"`), `Unlabelled field ${id}`);
  }
  assert.match(html, /id="enquiry-form" hidden/);
  assert.ok(!html.includes('action="/api/'));
});

test('shared assets stay within a small static-site budget', async () => {
  const root = path.resolve(__dirname, '../public');
  assert.ok((await fs.stat(path.join(root, 'site.js'))).size < 8000, 'Client JavaScript exceeds 8 KB');
  assert.ok((await fs.stat(path.join(root, 'styles.css'))).size < 35000, 'CSS exceeds 35 KB');
  for (const file of await fs.readdir(path.join(root, 'images'))) {
    assert.ok((await fs.stat(path.join(root, 'images', file))).size < 180000, `${file} exceeds 180 KB`);
  }
});

test('build rejects URLs unsuitable for canonical origins', async () => {
  for (const origin of ['javascript:alert(1)', 'https://example.com/nested/', 'https://user:password@example.com']) {
    await assert.rejects(build({ origin }), /SITE_URL/);
  }
});

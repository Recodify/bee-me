'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function brandingHarness({ reduced = false, top = 500 } = {}) {
  let headerHeight = 100;
  let artworkTop = top;
  let progress;
  let writes = 0;
  let offset;
  const events = {};
  const frames = [];
  const motion = { matches: reduced, addEventListener() {} };
  const header = {
    getBoundingClientRect: () => ({ height: headerHeight }),
    style: { setProperty(name, value) { progress = Number(value); writes++; } }
  };
  const artwork = { getBoundingClientRect: () => ({ top: artworkTop, height: 500 }), addEventListener() {} };
  const context = {
    document: {
      documentElement: { classList: { add() {} }, style: { setProperty(name, value) { offset = value; } } },
      querySelector: selector => ({ '.site-header-home': header, '.home-hero-emblem img': artwork })[selector] || null
    },
    window: {
      matchMedia: () => motion,
      addEventListener(name, callback) { events[name] = callback; },
      requestAnimationFrame(callback) { frames.push(callback); }
    }
  };
  vm.runInNewContext(fs.readFileSync(path.resolve(__dirname, '../public/site.js'), 'utf8'), context);
  return {
    events, frames, progress: () => progress, writes: () => writes, offset: () => offset,
    top(value) { artworkTop = value; }, height(value) { headerHeight = value; },
    flush() { while (frames.length) frames.shift()(); }
  };
}

test('branding crossfades while artwork passes behind the header and reverses on return', () => {
  const harness = brandingHarness();
  assert.equal(harness.progress(), 0);
  harness.top(-50); // Halfway through a 300px transition, relative to the 100px header.
  harness.events.scroll(); harness.flush();
  assert.equal(harness.progress(), .5);
  harness.top(-200);
  harness.events.scroll(); harness.flush();
  assert.equal(harness.progress(), 1);
  harness.top(500);
  harness.events.scroll(); harness.flush();
  assert.equal(harness.progress(), 0);
});

test('scroll events coalesce and unchanged progress does not rewrite styles', () => {
  const harness = brandingHarness();
  harness.events.scroll(); harness.events.scroll(); harness.events.scroll();
  assert.equal(harness.frames.length, 1);
  harness.flush();
  assert.equal(harness.writes(), 1);
  harness.height(150);
  harness.events.resize(); harness.flush();
  assert.equal(harness.offset(), '166px');
});

test('restored scroll positions initialise correctly and reduced motion avoids intermediate states', () => {
  assert.equal(brandingHarness({ top: -600 }).progress(), 1);
  const harness = brandingHarness({ reduced: true, top: 0 });
  assert.equal(harness.progress(), 0);
  harness.top(-100);
  harness.events.scroll(); harness.flush();
  assert.equal(harness.progress(), 1);
});

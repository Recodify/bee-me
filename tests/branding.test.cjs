'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function brandingHarness({ supported = true } = {}) {
  const observers = [];
  let resize;
  let height = 106;
  let compact = false;
  let offset;
  const hero = {};
  const header = {
    getBoundingClientRect: () => ({ height }),
    classList: { toggle(name, value) { assert.equal(name, 'has-passed-hero'); compact = value; } }
  };
  const context = {
    document: {
      documentElement: { classList: { add() {} }, style: { setProperty(name, value) { offset = value; } } },
      querySelector: selector => ({ '.site-header-home': header, '.home-hero': hero })[selector] || null
    }
  };
  if (supported) {
    context.IntersectionObserver = class {
      constructor(callback, options) { this.callback = callback; this.options = options; observers.push(this); }
      observe(target) { assert.equal(target, hero); }
      disconnect() { this.disconnected = true; }
    };
    context.ResizeObserver = class {
      constructor(callback) { resize = callback; }
      observe(target) { assert.equal(target, header); }
    };
  }
  vm.runInNewContext(fs.readFileSync(path.resolve(__dirname, '../public/site.js'), 'utf8'), context);
  return { observers, compact: () => compact, offset: () => offset, resize(value) { height = value; resize(); } };
}

test('branding follows the hero boundary in both directions and handles a restored scroll position', () => {
  const harness = brandingHarness();
  const observer = harness.observers[0];
  assert.equal(observer.options.rootMargin, '-106px 0px 0px 0px');
  assert.equal(harness.offset(), '122px');
  observer.callback([{ isIntersecting: false, boundingClientRect: { bottom: -200 } }]);
  assert.equal(harness.compact(), true);
  observer.callback([{ isIntersecting: true, boundingClientRect: { bottom: 400 } }]);
  assert.equal(harness.compact(), false);
  observer.callback([{ isIntersecting: false, boundingClientRect: { bottom: 1500 } }]);
  assert.equal(harness.compact(), false, 'A hero below the viewport has not been passed');
});

test('header resizing updates the boundary without creating duplicate observers for unchanged sizes', () => {
  const harness = brandingHarness();
  harness.resize(106);
  assert.equal(harness.observers.length, 1);
  harness.resize(98);
  assert.equal(harness.observers[0].disconnected, true);
  assert.equal(harness.observers[1].options.rootMargin, '-98px 0px 0px 0px');
  assert.equal(harness.offset(), '114px');
});

test('without observer support the wordmark remains available and the script does not fail', () => {
  const harness = brandingHarness({ supported: false });
  assert.equal(harness.observers.length, 0);
  assert.equal(harness.compact(), false);
});

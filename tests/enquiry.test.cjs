'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

// Exercise the shipped browser script through its DOM boundary without launching the website.
function enquiryHarness({ clipboardFails = false, valid = true } = {}) {
  const values = { name: 'Alex Smith', email: 'alex@example.com', company: 'A & B Ltd', phone: '', type: 'maintenance', location: 'BS29', timing: '', message: 'Three properties\nFire alarm testing & remedial work.' };
  const formEvents = {};
  const nodes = {};
  for (const id of ['email-draft', 'draft-body', 'copy-status', 'open-email', 'draft-heading', 'copy-enquiry']) {
    nodes[`#${id}`] = { hidden: true, value: '', textContent: '', focus() { this.focused = true; }, select() { this.selected = true; }, addEventListener(event, handler) { this[event] = handler; } };
  }
  nodes['#enquiry-form'] = { hidden: true, elements: { type: { value: 'project' } }, reportValidity: () => valid, addEventListener(event, handler) { formEvents[event] = handler; } };
  let copied = '';
  const context = {
    document: { documentElement: { classList: { add() {} } }, querySelector: selector => nodes[selector] || null },
    window: { location: { search: '?type=maintenance' } }, URLSearchParams,
    FormData: class { get(key) { return values[key]; } },
    navigator: { clipboard: { async writeText(message) { if (clipboardFails) throw new Error('Unavailable'); copied = message; } } }
  };
  vm.runInNewContext(fs.readFileSync(path.resolve(__dirname, '../public/site.js'), 'utf8'), context);
  return { nodes, formEvents, copied: () => copied };
}

test('enquiry produces an encoded email draft, preserves punctuation and clears stale drafts', async () => {
  const harness = enquiryHarness();
  const { nodes, formEvents } = harness;
  assert.equal(nodes['#enquiry-form'].hidden, false);
  assert.equal(nodes['#enquiry-form'].elements.type.value, 'maintenance');
  let prevented = false;
  formEvents.submit({ preventDefault() { prevented = true; } });
  assert.ok(prevented);
  assert.equal(nodes['#email-draft'].hidden, false);
  assert.ok(nodes['#draft-heading'].focused);
  const url = new URL(nodes['#open-email'].href);
  assert.equal(url.protocol, 'mailto:');
  assert.equal(url.pathname, 'admin@bee-me.ltd');
  assert.match(url.searchParams.get('subject'), /Bee M&E enquiry/);
  assert.equal(url.searchParams.get('body'), nodes['#draft-body'].value);
  assert.match(url.searchParams.get('body'), /A & B Ltd/);
  assert.match(url.searchParams.get('body'), /Three properties\nFire alarm testing & remedial work\./);
  await nodes['#copy-enquiry'].click();
  assert.equal(harness.copied(), nodes['#draft-body'].value);
  formEvents.input();
  assert.equal(nodes['#email-draft'].hidden, true);
});

test('clipboard failure selects the message for manual copying', async () => {
  const { nodes, formEvents } = enquiryHarness({ clipboardFails: true });
  formEvents.submit({ preventDefault() {} });
  await nodes['#copy-enquiry'].click();
  assert.ok(nodes['#draft-body'].selected);
  assert.match(nodes['#copy-status'].textContent, /Select and copy/);
});

test('invalid form does not expose a draft', () => {
  const { nodes, formEvents } = enquiryHarness({ valid: false });
  formEvents.submit({ preventDefault() {} });
  assert.equal(nodes['#email-draft'].hidden, true);
});

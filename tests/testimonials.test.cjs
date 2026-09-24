'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { testimonialSection } = require('../src/templates/testimonials.cjs');
const { getPages } = require('../src/templates/pages.cjs');

test('samples are absent unless explicitly enabled', () => {
  assert.equal(testimonialSection([]), '');
  for (const page of getPages()) {
    assert.ok(!page.body.includes('class="testimonial-section"'));
    assert.ok(!page.body.includes('aria-label="Client testimonials"'));
    assert.ok(!page.body.includes('aggregateRating'));
  }
});

test('draft sample quotes are labelled, relevant and give way to approved quotes', () => {
  const home = getPages({ showSamples: true }).find(page => page.path === '/');
  assert.match(home.body, /fictional placeholders, not client reviews/);
  assert.equal((home.body.match(/<blockquote>/g) || []).length, 3);
  const hmo = testimonialSection([], 'hmo-conversion', true);
  assert.match(hmo, /Example property developer/);
  assert.ok(!hmo.includes('Example building contractor'));
  assert.equal(testimonialSection([], 'full-property-rewire', true), '');
  const approved = testimonialSection([{ approved: true, quote: 'Approved test fixture', attribution: 'Test client' }], '', true);
  assert.match(approved, /Approved test fixture/);
  assert.ok(!approved.includes('fictional'));
});

test('only approved, attributed quotations appear and case studies get relevant quotes', () => {
  const fixture = { quote: 'Test quotation <example> & text.', attribution: 'Test person', context: 'Test organisation', approved: true, projectSlug: 'hmo-conversion' };
  const entries = [fixture, { ...fixture, approved: false, quote: 'Unapproved fixture' }, { ...fixture, attribution: '' }, { ...fixture, quote: '  ' }];
  const html = testimonialSection(entries);
  assert.match(html, /Test quotation &lt;example&gt; &amp; text\./);
  assert.match(html, /Test person/);
  assert.match(html, /Test organisation/);
  assert.ok(!html.includes('Unapproved fixture'));
  assert.equal((html.match(/<blockquote>/g) || []).length, 1);
  assert.equal(testimonialSection(entries, 'full-property-rewire'), '');
  assert.match(testimonialSection(entries, 'hmo-conversion'), /Test person/);
});

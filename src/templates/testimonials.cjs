'use strict';

const { escape } = require('./components.cjs');
const samples = require('../data/sample-testimonials.cjs');

function testimonialSection(entries, projectSlug = '', showSamples = false) {
  const approved = entries.filter(entry => entry.approved === true &&
    typeof entry.quote === 'string' && entry.quote.trim() &&
    typeof entry.attribution === 'string' && entry.attribution.trim() &&
    (!projectSlug || entry.projectSlug === projectSlug)).slice(0, 3);
  const isSample = !approved.length && showSamples;
  const visible = isSample ? samples.filter(entry => !projectSlug || entry.projectSlug === projectSlug).slice(0, 3) : approved;
  if (!visible.length) return '';

  return `<section class="section testimonial-section" aria-label="${isSample ? 'Sample testimonials' : 'Client testimonials'}">
    <div class="container">
      <p class="eyebrow">From our clients</p>
      <h2>Working relationships.<br>In their own words.</h2>
      ${isSample ? '<p class="testimonial-sample-note">Layout preview — the quotations below are fictional placeholders, not client reviews.</p>' : ''}
      <div class="testimonial-grid">
        ${visible.map(entry => `<figure class="testimonial">
          <blockquote><p>${escape(entry.quote)}</p></blockquote>
          <figcaption>${escape(entry.attribution)}${entry.context ? `<span>${escape(entry.context)}</span>` : ''}</figcaption>
        </figure>`).join('')}
      </div>
    </div>
  </section>`;
}

module.exports = { testimonialSection };

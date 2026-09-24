'use strict';

function reviewWidget(preview = false) {
  return `<div class="review-widget" aria-label="Checkatrade customer reviews">
    <script async src="https://www.checkatrade.com/static/js/reviews-score-widget.js" data-company-id="631458"></script>
    <div class="review-fallback">
      <p class="review-provider">Checkatrade</p>
      ${preview ? `<p class="review-score">9.3<span>/10</span></p>
      <p>47 reviews over the last 12 months</p>
      <p class="review-snapshot">Preview snapshot · 24 September 2026</p>` : ''}
      <a href="https://www.checkatrade.com/trades/worksolutionselectricalltd">Read our reviews on Checkatrade ↗</a>
    </div>
    <p class="review-other"><a href="https://share.google/VTIsFXHhVHUJP8tGp">View our Google profile ↗</a></p>
  </div>`;
}

function reviewStrip(preview = false) {
  return `<section class="review-strip" aria-label="Independent customer feedback">
    <div class="container review-strip-inner">
      <div><p class="eyebrow">Independent customer feedback</p>
        <h2>See what our customers say.</h2>
        <p>Read customer feedback on our Checkatrade profile, alongside the project examples here on our website.</p>
      </div>
      ${reviewWidget(preview)}
    </div>
  </section>`;
}

module.exports = { reviewWidget, reviewStrip };

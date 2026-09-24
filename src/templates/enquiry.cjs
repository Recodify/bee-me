'use strict';

const { arrow } = require('./components.cjs');

function enquiryForm() {
  return `<div class="enquiry-panel">
    <p class="eyebrow">Start your enquiry</p>
    <h2>What can we help with?</h2>
    <p>A short outline is enough to start. Prepare an email here, then review and send it from your email app.</p>
    <noscript><p>Email <a href="mailto:admin@worksolutions.ltd">admin@worksolutions.ltd</a> with your name, site location and the work required.</p></noscript>
    <form id="enquiry-form" hidden>
      <div class="form-grid">
        <div>
          <label for="name">Your name <span>(required)</span></label>
          <input id="name" name="name" autocomplete="name" maxlength="120" required>
        </div>
        <div>
          <label for="email">Email <span>(required)</span></label>
          <input id="email" name="email" type="email" autocomplete="email" maxlength="254" required>
        </div>
        <div>
          <label for="type">I’m interested in</label>
          <select id="type" name="type">
            <option value="project">Project work</option>
            <option value="maintenance">Ongoing maintenance</option>
            <option value="other">Something else</option>
          </select>
        </div>
        <div>
          <label for="location">Site town or postcode <span>(required)</span></label>
          <input id="location" name="location" maxlength="160" required>
        </div>
        <div class="full">
          <label for="message">Tell us about the work <span>(required)</span></label>
          <textarea id="message" name="message" rows="4" maxlength="4000" required aria-describedby="message-hint"></textarea>
          <p id="message-hint" class="field-hint">Include any intended dates. For maintenance, tell us about the properties you manage.</p>
        </div>
      </div>
      <details class="enquiry-options">
        <summary>Add company, telephone or timing details <span>(optional)</span></summary>
        <div class="form-grid">
          <div>
            <label for="company">Company</label>
            <input id="company" name="company" autocomplete="organization" maxlength="160">
          </div>
          <div>
            <label for="phone">Telephone</label>
            <input id="phone" name="phone" type="tel" autocomplete="tel" maxlength="40">
          </div>
          <div class="full">
            <label for="timing">Preferred timing</label>
            <input id="timing" name="timing" maxlength="160" placeholder="Planned start month or tender deadline">
          </div>
        </div>
      </details>
      <p class="small">Your details stay in this browser until you send the email. <a href="/privacy/">Privacy information</a>.</p>
      <button class="button" type="submit">Prepare enquiry ${arrow}</button>
    </form>
    <section id="email-draft" class="email-draft" hidden aria-labelledby="draft-heading">
      <h3 id="draft-heading" tabindex="-1">Your email is ready to review.</h3>
      <p>Nothing has been sent. Open your email app to send the enquiry, or copy the message into an email to <a href="mailto:admin@worksolutions.ltd">admin@worksolutions.ltd</a>.</p>
      <label for="draft-body">Enquiry message</label>
      <textarea id="draft-body" rows="12" readonly></textarea>
      <div class="button-row">
        <a id="open-email" class="button" href="mailto:admin@worksolutions.ltd">Open email app ${arrow}</a>
        <button id="copy-enquiry" class="button button-secondary" type="button">Copy message</button>
      </div>
      <p id="copy-status" role="status"></p>
    </section>
  </div>`;
}

function homeEnquiry(photo) {
  return `<section class="section home-enquiry" id="enquire" aria-label="Discuss your project">
    <div class="container contact-grid">
      <div>
        <p class="eyebrow">Local people. Ready to talk.</p>
        <h2>Have a project in mind?<br>Let’s talk it through.</h2>
        <p class="lead">A commercial installation, a property rewire or a regular contractor for your portfolio. Tell us what you need.</p>
        <div class="director-intro">
          ${photo('matt-hoy-green', 'Matt Hoy-Green, director of Work Solutions')}
          <div><strong>Matt Hoy-Green</strong><span>Director, Work Solutions</span></div>
        </div>
        <div class="contact-detail"><span>Prefer a conversation?</span><a href="tel:01934533217">01934 533 217</a></div>
        <div class="contact-detail"><span>Plans or a specification to share?</span><a href="mailto:admin@worksolutions.ltd">admin@worksolutions.ltd</a></div>
        <p class="enquiry-location">Based in Banwell. Working across Somerset and the Bristol area.</p>
        <a class="text-link" href="https://www.checkatrade.com/trades/worksolutionselectricalltd">Read our Checkatrade reviews ${arrow}</a>
      </div>
      ${enquiryForm()}
    </div>
  </section>`;
}

module.exports = { enquiryForm, homeEnquiry };

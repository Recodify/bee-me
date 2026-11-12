'use strict';

// Navigation remains visible when JavaScript is unavailable.
document.documentElement.classList.add('js');

// Follow the artwork itself, not the hero section's trailing text and padding.
const homeHeader = document.querySelector('.site-header-home');
const heroArtwork = document.querySelector('.home-hero-emblem img');
if (homeHeader && heroArtwork) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let pending = false;
  let lastProgress = -1;
  let lastHeight = -1;
  const updateBrand = () => {
    pending = false;
    const headerHeight = Math.ceil(homeHeader.getBoundingClientRect().height);
    const artwork = heroArtwork.getBoundingClientRect();
    // Crossfade as the first 60% of the artwork moves behind the sticky header.
    let progress = Math.min(1, Math.max(0, (headerHeight - artwork.top) / Math.max(1, artwork.height * .6)));
    progress = reducedMotion.matches ? Number(progress >= .5) : Math.round(progress * 1000) / 1000;
    if (headerHeight !== lastHeight) {
      document.documentElement.style.setProperty('--header-offset', `${headerHeight + 16}px`);
      lastHeight = headerHeight;
    }
    if (progress !== lastProgress) {
      homeHeader.style.setProperty('--brand-progress', String(progress));
      lastProgress = progress;
    }
  };
  const scheduleBrand = () => {
    if (pending) return;
    pending = true;
    window.requestAnimationFrame(updateBrand);
  };
  window.addEventListener('scroll', scheduleBrand, { passive: true });
  window.addEventListener('resize', scheduleBrand, { passive: true });
  window.addEventListener('pageshow', scheduleBrand);
  reducedMotion.addEventListener('change', scheduleBrand);
  heroArtwork.addEventListener('load', scheduleBrand);
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(scheduleBrand).observe(homeHeader);
  updateBrand();
}

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
if (menuButton && navigation) {
  menuButton.hidden = false;
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
  };
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(isOpen));
    navigation.classList.toggle('is-open', isOpen);
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const serviceMenu = navigation.querySelector('details[open]');
    if (serviceMenu) {
      serviceMenu.open = false;
      serviceMenu.querySelector('summary').focus();
    } else if (menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuButton.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) {
      closeMenu();
      navigation.querySelectorAll('details[open]').forEach(details => { details.open = false; });
    }
  });
}

const form = document.querySelector('#enquiry-form');
if (form) {
  form.hidden = false;
  const type = new URLSearchParams(window.location.search).get('type');
  if (['project', 'maintenance', 'other'].includes(type)) form.elements.type.value = type;

  const draftSection = document.querySelector('#email-draft');
  const draftBody = document.querySelector('#draft-body');
  const status = document.querySelector('#copy-status');
  form.addEventListener('input', () => {
    // Editing the brief invalidates the previously prepared message.
    draftSection.hidden = true;
    status.textContent = '';
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    const labels = { project: 'Project work', maintenance: 'Ongoing maintenance', other: 'Other enquiry' };
    const enquiryType = labels[fields.get('type')] || labels.other;
    const subject = `Bee M&E enquiry: ${enquiryType}`;
    const message = [
      `Enquiry: ${enquiryType}`,
      `Name: ${String(fields.get('name')).trim()}`,
      `Email: ${String(fields.get('email')).trim()}`,
      `Company: ${String(fields.get('company')).trim() || 'Not provided'}`,
      `Telephone: ${String(fields.get('phone')).trim() || 'Not provided'}`,
      `Site location: ${String(fields.get('location')).trim()}`,
      `Preferred timing: ${String(fields.get('timing')).trim() || 'To discuss'}`,
      '', 'Work required:', String(fields.get('message')).trim()
    ].join('\n');
    draftBody.value = message;
    document.querySelector('#open-email').href = `mailto:admin@bee-me.ltd?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    draftSection.hidden = false;
    document.querySelector('#draft-heading').focus();
  });
  document.querySelector('#copy-enquiry').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(draftBody.value);
      status.textContent = 'Message copied. Paste it into an email to admin@bee-me.ltd.';
    } catch {
      draftBody.focus();
      draftBody.select();
      status.textContent = 'Select and copy the message above, then paste it into your email.';
    }
  });
}

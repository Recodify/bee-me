'use strict';

const services = require('../data/services.cjs');

function escape(value = '') {
  return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
}

const arrow = '<span aria-hidden="true">↗</span>';
const button = (text, href = '/contact/', secondary = false) => `<a class="button${secondary ? ' button-secondary' : ''}" href="${escape(href)}">${escape(text)} ${arrow}</a>`;
const link = (text, href) => `<a class="text-link" href="${escape(href)}">${escape(text)} ${arrow}</a>`;

function photo(name, alt, options = {}) {
  const sizes = { 'engineer-solar': [1600, 995], 'site-team': [1280, 796], 'matt-hoy-green': [640, 471] };
  const dimensions = sizes[name] || [960, 1280];
  return `<img src="/images/${escape(name)}.webp" alt="${escape(alt)}" width="${dimensions[0]}" height="${dimensions[1]}" ${options.eager ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"'} decoding="async"${options.className ? ` class="${escape(options.className)}"` : ''}>`;
}

function pageHero(eyebrow, title, intro, { image = '', imageAlt = '', action = '', actionHref = '/contact/' } = {}) {
  return `<section class="page-hero${image ? ' with-image' : ''}"><div class="container hero-grid"><div class="hero-copy"><p class="eyebrow">${escape(eyebrow)}</p><h1>${escape(title)}</h1><p class="lead">${escape(intro)}</p>${action ? button(action, actionHref) : ''}</div>${image ? `<div class="hero-photo">${photo(image, imageAlt, { eager: true })}<span class="photo-label">Work Solutions / On site</span></div>` : '<div class="circuit-art" aria-hidden="true"><span></span><span></span><span></span><b>WS<span>Electrical projects.<br>Ongoing partnerships.</span></b></div>'}</div></section>`;
}

function serviceCards() {
  return `<div class="service-grid">${services.map(service => `<a class="service-card" href="/services/${service.slug}/"><span class="card-top"><span class="number">${service.number}</span>${arrow}</span><h3>${escape(service.title)}</h3><p>${escape(service.summary)}</p><span class="card-link">Explore service</span></a>`).join('')}</div>`;
}

function projectCards(projects) {
  return `<div class="project-grid">${projects.map((project, index) => `<article class="project-card"><a href="/projects/${project.slug}/" class="project-visual" tabindex="-1" aria-hidden="true">${project.image ? photo(project.image, '') : `<div class="project-art art-${index % 3}"><span>${escape(project.category)}</span><b>${String(index + 1).padStart(2, '0')}</b><i>Work Solutions</i></div>`}</a><p class="eyebrow">${escape(project.category)}</p><h3><a href="/projects/${project.slug}/">${escape(project.title)} ${arrow}</a></h3><p>${escape(project.summary)}</p></article>`).join('')}</div>`;
}

function cta(title = 'Let’s talk about your next project.', description = 'Send us your plans, outline the work, or tell us about the properties you manage.') {
  return `<section class="cta"><div class="container cta-inner"><div><p class="eyebrow">Start a conversation</p><h2>${escape(title)}</h2><p>${escape(description)}</p></div>${button('Discuss your project')}</div></section>`;
}

function layout({ title, description, path, body, indexable = false, origin = 'https://www.worksolutions.ltd' }) {
  const nav = [['Services', '/services/'], ['Maintenance', '/maintenance/'], ['Projects', '/projects/'], ['About', '/about/'], ['Contact', '/contact/']];
  const current = href => path === href ? ' aria-current="page"' : '';
  return `<!doctype html>
<html lang="en-GB">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escape(title)} | Work Solutions</title>
  <meta name="description" content="${escape(description)}">
  <meta name="robots" content="${indexable && path !== '/404/' ? 'index,follow' : 'noindex,follow'}">
  <meta name="theme-color" content="#191b19">
  <link rel="canonical" href="${escape(origin + path)}">
  <meta property="og:title" content="${escape(title)} | Work Solutions">
  <meta property="og:description" content="${escape(description)}">
  <meta property="og:type" content="website"><meta property="og:locale" content="en_GB">
  <meta property="og:url" content="${escape(origin + path)}">
  <meta property="og:image" content="${escape(origin)}/images/engineer-solar.webp">
  <meta property="og:image:alt" content="Work Solutions engineer on site">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="stylesheet" href="/styles.css"><script src="/site.js" defer></script>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<div class="utility"><div class="container"><span>Electrical contracting · Somerset &amp; Bristol</span><a href="tel:01934533217">01934 533 217 <span aria-hidden="true">↗</span></a></div></div>
<header class="site-header"><div class="container header-inner">
  <a class="brand" href="/" aria-label="Work Solutions — Home"><img src="/images/logo.webp" width="170" height="76" alt="Work Solutions"></a>
  <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav" hidden>Menu <span aria-hidden="true">☰</span></button>
  <nav id="main-nav" aria-label="Main navigation">${nav.map(([label, href]) => href === '/services/' ? `<div class="nav-services"><a href="${href}"${current(href)}>${label}</a><details class="service-menu"><summary aria-label="Service pages"><span aria-hidden="true">⌄</span></summary><div class="service-dropdown">${services.map(service => `<a href="/services/${service.slug}/"${current(`/services/${service.slug}/`)}>${escape(service.title)}</a>`).join('')}</div></details></div>` : `<a href="${href}"${current(href)}>${label}</a>`).join('')}</nav>
  ${button('Discuss your project', '/contact/')}
</div></header>
<main id="main">${body}</main>
<footer class="site-footer"><div class="container footer-grid">
  <div><a class="brand" href="/" aria-label="Work Solutions — Home"><img src="/images/logo.webp" width="170" height="76" alt="Work Solutions" loading="lazy"></a><p>Electrical projects.<br>Ongoing partnerships.</p><span class="small">Based in Banwell. Working across Somerset<br>and the Bristol area.</span></div>
  <div><h2>Explore</h2>${nav.map(([label, href]) => `<a href="${href}">${label}</a>`).join('')}</div>
  <div><h2>Our services</h2>${services.map(service => `<a href="/services/${service.slug}/">${escape(service.title)}</a>`).join('')}<a href="/maintenance/">Maintenance &amp; landlord compliance</a></div>
  <div><h2>Let’s talk</h2><a href="tel:01934533217">01934 533 217</a><a href="mailto:admin@worksolutions.ltd">admin@worksolutions.ltd</a><address>17 Wolvershill Park<br>Banwell, BS29 6DQ</address></div>
</div><div class="container footer-bottom"><span>© ${new Date().getFullYear()} Work Solutions</span><div><a href="/privacy/">Privacy</a><a href="https://www.worksolutions.ltd/s/Work-Solutions-Electrical-Ltd-Terms-and-Conditions.pdf">Terms &amp; conditions <span class="small">(PDF)</span></a></div></div></footer>
</body></html>`;
}

module.exports = { escape, arrow, button, link, photo, pageHero, serviceCards, projectCards, cta, layout };

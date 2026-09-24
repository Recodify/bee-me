'use strict';

const services = require('../data/services.cjs');
const projects = require('../data/projects.cjs');
const testimonials = require('../data/testimonials.cjs');
const { testimonialSection } = require('./testimonials.cjs');
const { enquiryForm, homeEnquiry } = require('./enquiry.cjs');
const { reviewWidget, reviewStrip } = require('./reviews.cjs');
const { escape: e, arrow, button, link, photo, pageHero, serviceCards, projectCards, cta } = require('./components.cjs');
const list = items => `<ul class="scope-list">${items.map(item => `<li>${e(item)}</li>`).join('')}</ul>`;
const sectionHead = (eyebrow, title, aside = '') => `<div class="section-head">
  <div>
  <p class="eyebrow">${e(eyebrow)}</p>
  <h2>${e(title)}</h2>
  </div>${aside}</div>`;

function home(showSamples) {
  return `<section class="home-hero">
  <div class="container home-hero-grid">
  <div class="home-hero-copy">
  <p class="eyebrow">
  <span class="status-dot">
  </span> Electrical contractors · Somerset &amp; Bristol</p>
  <h1>Electrical projects.<span>A contractor you<br>can work with.</span></h1>
  <p class="lead">Commercial installations, rewires and ongoing maintenance for businesses, landlords and contractors.</p>
  <p class="hero-location">Based in Banwell. Working across Somerset and the Bristol area.</p>
  <div class="button-row">${button('Discuss your project', '#enquire')}${link('View our work', '/projects/')}</div>
  </div>
  <figure class="home-hero-photo">${photo('engineer-solar', 'Work Solutions engineer working on building services equipment beside solar inverters', { eager: true })}<figcaption>
  <span>Our people. On your project.</span>
  <span aria-hidden="true">↗</span>
  </figcaption>
  </figure>
  </div>
  <div class="container hero-bottom">
  <span>Commercial installations</span>
  <span>Refurbishments &amp; rewires</span>
  <span>Planned maintenance</span>
  </div>
  </section>
  ${reviewStrip(showSamples)}
  <section class="section">
  <div class="container">${sectionHead('What we do', 'Electrical projects.\nOngoing maintenance.', '<p class="section-intro">A project to deliver. A portfolio to look after. Start with the support you need.</p>')}<div class="route-grid">
  <a class="route-card" href="/services/">
  <span class="eyebrow">01 / Project delivery</span>
  <h3>From the first circuit<br>to the final handover.</h3>
  <p>Electrical packages for commercial premises, property conversions and substantial refurbishments.</p>
  <span class="text-link">Explore electrical services ${arrow}</span>
  </a>
  <a class="route-card route-dark" href="/maintenance/">
  <span class="eyebrow">02 / Ongoing partnerships</span>
  <h3>One property.<br>Or a whole portfolio.</h3>
  <p>Planned maintenance, testing and remedial work for landlords, property managers and businesses.</p>
  <span class="text-link">Explore maintenance ${arrow}</span>
  </a>
  </div>
  </div>
  </section>
  <section class="section section-tint">
  <div class="container">${sectionHead('Our services', 'Electrical services for\nyour buildings and projects.', link('All services', '/services/'))}${serviceCards()}</div>
  </section>
  <section class="section">
  <div class="container">${sectionHead('Selected projects', 'See what we’ve worked on.', link('View all projects', '/projects/'))}${projectCards(projects.slice(0, 3))}</div>
  </section>
  ${testimonialSection(testimonials, '', showSamples)}
  <section class="section section-dark">
  <div class="container split">
  <div>
  <p class="eyebrow">Built on working relationships</p>
  <h2>Your next project.<br>And the one after that.</h2>
  <p class="lead">We work with the people who build, improve and manage properties.</p>${link('Meet Work Solutions', '/about/')}</div>
  <div class="audience-list">
  <div>
  <span>01</span>
  <h3>Contractors &amp; developers</h3>
  <p>Electrical packages within your wider building programme.</p>
  </div>
  <div>
  <span>02</span>
  <h3>Landlords &amp; property managers</h3>
  <p>Conversions, upgrades and ongoing attention across your properties.</p>
  </div>
  <div>
  <span>03</span>
  <h3>Commercial owners</h3>
  <p>Installations and maintenance for the premises your business relies on.</p>
  </div>
  </div>
  </div>
  </section>
  <section class="section">
  <div class="container">${sectionHead('Getting started', 'A useful conversation starts here.')}<div class="steps">
  <div>
  <span>01</span>
  <h3>Tell us about the work</h3>
  <p>Share the location, scope and intended timing. Plans and specifications are welcome.</p>
  </div>
  <div>
  <span>02</span>
  <h3>Discuss the details</h3>
  <p>Talk through the electrical requirements, access and how the work fits your project.</p>
  </div>
  <div>
  <span>03</span>
  <h3>Agree the next step</h3>
  <p>Establish what is needed to move your project or maintenance enquiry forward.</p>
  </div>
  </div>
  </div>
  </section>${homeEnquiry(photo)}`;
}

function servicesPage() {
  return `${pageHero('Our services', 'Electrical installations,\nrewires and maintenance.', 'Commercial installations, property rewires and specialist systems, with ongoing maintenance for the buildings you manage.')}<section class="section">
  <div class="container">${sectionHead('Find your service', 'What does your project need?')}${serviceCards()}<div class="maintenance-banner">
  <div>
  <p class="eyebrow">Looking beyond the installation?</p>
  <h2>Maintenance &amp; landlord compliance</h2>
  <p>Discuss planned testing, remedial works and ongoing electrical support for your premises or portfolio.</p>
  </div>${button('Explore maintenance', '/maintenance/')}</div>
  </div>
  </section>${cta()}`;
}

function servicePage(service) {
  const related = services.find(item => item.slug === service.related);
  const project = projects.find(item => item.slug === service.project);
  return `<div class="container breadcrumbs">
  <a href="/services/">Services</a>
  <span aria-hidden="true">/</span>
  <span>${e(service.title)}</span>
  </div>${pageHero(service.audience, service.heading, service.intro, { image: service.image, imageAlt: service.imageAlt, action: service.cta })}<section class="section">
  <div class="container split">
  <div>
  <p class="eyebrow">Scope of work</p>
  <h2>${e(service.detailTitle)}</h2>
  <p>${e(service.detail)}</p>
  </div>
  <div>${list(service.scope)}</div>
  </div>
  </section>
  <section class="section section-tint">
  <div class="container split">
  <div>
  <p class="eyebrow">Working together</p>
  <h2>${e(service.secondTitle)}</h2>
  </div>
  <div>
  <p class="lead">${e(service.second)}</p>${link('Discuss your requirements', '/contact/')}</div>
  </div>
  </section>
  <section class="section">
  <div class="container">${sectionHead('Relevant experience', 'See the work behind the service.')}${projectCards([project])}</div>
  </section>
  <section class="section section-tint">
  <div class="container split">
  <div>
  <p class="eyebrow">Useful to know</p>
  <h2>Before we get started.</h2>
  </div>
  <div class="faq">${service.questions.map(([question, answer]) => `<details>
  <summary>${e(question)}<span aria-hidden="true">+</span>
  </summary>
  <p>${e(answer)}</p>
  </details>`).join('')}</div>
  </div>
  </section>
  <div class="container related-links">${link(related.title, `/services/${related.slug}/`)}${link('Ongoing maintenance', '/maintenance/')}</div>${cta(service.cta + '.', 'Tell us about the location, scope and timing of the work you have in mind.')}`;
}

function maintenance() {
  return `${pageHero('Maintenance & landlord compliance', 'A regular partner.\nFor the properties you manage.', 'Electrical testing, planned maintenance and remedial work for landlords, property managers and commercial owners.', { image: 'site-team', imageAlt: 'Two Work Solutions engineers working together on site', action: 'Discuss ongoing maintenance', actionHref: '/contact/?type=maintenance' })}<section class="section">
  <div class="container">${sectionHead('Ongoing support', 'Keep the whole portfolio in view.', '<p class="section-intro">Talk to us about one building or a programme of work across several properties.</p>')}<div class="maintenance-grid">${[
    ['Electrical testing', 'EICR programmes and follow-up electrical work for the properties you manage.'],
    ['Fire alarm maintenance', 'Ongoing attention to the fire alarm systems within your agreed maintenance scope.'],
    ['Emergency lighting', 'Discuss testing and remedial work for emergency lighting across your premises.'],
    ['Planned electrical maintenance', 'Bring recurring requirements, improvements and repairs into a conversation about ongoing support.']
  ].map(([title, text], i) => `<article>
  <span class="number">0${i + 1}</span>
  <h3>${title}</h3>
  <p>${text}</p>
  </article>`).join('')}</div>
  </div>
  </section>
  <section class="section section-dark">
  <div class="container split">
  <div>
  <p class="eyebrow">Start with your properties</p>
  <h2>Tell us what<br>you look after.</h2>
  <p class="lead">A clear property brief helps establish the right scope of ongoing work.</p>
  </div>
  <div>${list(['Number, type and location of properties', 'Existing systems and available records', 'Testing and maintenance requirements', 'Access arrangements and preferred timing', 'Reporting and follow-up work needed'])}${button('Discuss your portfolio', '/contact/?type=maintenance')}</div>
  </div>
  </section>
  <section class="section">
  <div class="container split">
  <div>
  <p class="eyebrow">Projects and maintenance</p>
  <h2>When a building needs more.</h2>
  </div>
  <div>
  <p class="lead">If testing or changing requirements lead to a larger upgrade, explore our installation and refurbishment services.</p>${link('Explore electrical services', '/services/')}</div>
  </div>
  </section>${cta('Let’s discuss an ongoing relationship.', 'Send the property locations, systems involved and the support you need.')}`;
}

function projectsPage() {
  return `${pageHero('Our projects', 'Electrical projects\nand refurbishments.', 'Explore the work we’ve delivered for contractors, landlords and property owners, from complete rewires to commercial installations.', { image: 'lighting-installation', imageAlt: 'Work Solutions engineer alongside installed pendant lighting', action: 'Discuss a similar project' })}<section class="section">
  <div class="container">${projectCards(projects)}</div>
  </section>${cta('Have a similar project in mind?')}`;
}

function projectPage(project, showSamples) {
  const service = services.find(item => item.slug === project.service);
  return `<div class="container breadcrumbs">
  <a href="/projects/">Projects</a>
  <span aria-hidden="true">/</span>
  <span>${e(project.category)}</span>
  </div>${pageHero(project.category, project.title, project.summary, { image: project.image, imageAlt: project.imageAlt || '' })}<section class="section">
  <div class="container case-layout">
  <aside class="project-facts">
  <p class="eyebrow">Project at a glance</p>
  <dl>
  <dt>Type of work</dt>
  <dd>${e(project.category)}</dd>
  <dt>Our role</dt>
  <dd>${e(project.role)}</dd>
  <dt>Related service</dt>
  <dd>
  <a href="/services/${service.slug}/">${e(service.title)}</a>
  </dd>
  </dl>${link('Discuss a similar project', '/contact/')}</aside>
  <div class="case-copy">
  <p class="eyebrow">01 / The brief</p>
  <h2>What the project needed.</h2>
  <p class="lead">${e(project.brief)}</p>
  <p class="eyebrow">02 / Our work</p>
  <h2>The scope we delivered.</h2>${list(project.scope)}<p class="eyebrow">03 / The result</p>
  <h2>Work completed.</h2>
  <p class="lead">${e(project.result)}</p>
  </div>
  </div>
  </section>${testimonialSection(testimonials, project.slug, showSamples)}${cta('Let’s discuss your project.', 'Send us a brief or specification and tell us when you are planning the work.')}`;
}

function about() {
  return `${pageHero('About Work Solutions', 'Local people.\nPractical expertise.', 'Based in Banwell, we deliver electrical project work and ongoing support for contractors, landlords and businesses across Somerset and the Bristol area.', { image: 'site-team', imageAlt: 'Work Solutions team members carrying out installation work' })}<section class="section">
  <div class="container split">
  <div>
  <p class="eyebrow">Our focus</p>
  <h2>Good work starts with\na clear understanding.</h2>
  </div>
  <div>
  <p class="lead">We bring electrical installation experience to commercial premises, property conversions and refurbishment projects.</p>
  <p>Our project background includes work through principal contractors and specialist building services teams, alongside rewires, distribution upgrades, fire alarms and emergency lighting.</p>
  <p>We welcome conversations about a specific package of work and about becoming a regular contractor for the properties you manage.</p>${link('Explore our projects', '/projects/')}</div>
  </div>
  </section>
  <section class="section section-tint">
  <div class="container director-grid">
  <div class="director-photo">${photo('matt-hoy-green', 'Matt Hoy-Green, director of Work Solutions')}</div>
  <div>
  <p class="eyebrow">Meet the director</p>
  <h2>Matt Hoy-Green</h2>
  <p class="lead">Director, Work Solutions</p>
  <p>Discuss your electrical project, refurbishment scope or ongoing maintenance requirements with the business.</p>${button('Get in touch')}</div>
  </div>
  </section>
  <section class="section">
  <div class="container split">
  <div>
  <p class="eyebrow">Credentials & project information</p>
  <h2>The detail you need\nto assess your contractor.</h2>
  </div>
  <div>
  <p class="lead">Contact us for current registration, insurance and project information relevant to your appointment.</p>
  <p>Tell us which information your procurement process requires, along with the scope of work. Testing and certification form part of the completed installations described in our case studies.</p>
  <p>Plumbing, gas and carpentry requirements can also be discussed where they form part of a wider refurbishment.</p>${link('Request contractor information', '/contact/')}</div>
  </div>
  </section>${cta()}`;
}

function contact(showSamples) {
  return `${pageHero('Contact', 'Let’s talk\nabout the work.', 'An upcoming project, a tender enquiry or properties to look after. Tell us what you have in mind.')}<section class="section">
  <div class="container contact-grid">
  <aside>
  <p class="eyebrow">Speak to Work Solutions</p>
  <h2>A useful first conversation.</h2>
  <div class="contact-detail">
  <span>Call us</span>
  <a href="tel:01934533217">01934 533 217</a>
  </div>
  <div class="contact-detail">
  <span>Email us</span>
  <a href="mailto:admin@worksolutions.ltd">admin@worksolutions.ltd</a>
  </div>
  <div class="contact-detail">
  <span>Based in Banwell</span>
  <address>17 Wolvershill Park<br>Banwell, BS29 6DQ</address>
  </div>
  <div class="contact-note">
  <h3>Have drawings or a specification?</h3>
  <p>Email them with your site location and intended dates. For maintenance, include the number and type of properties.</p>
  </div>
  ${reviewWidget(showSamples)}
  </aside>
  ${enquiryForm()}
  </div>
  </section>`;
}

function privacy() {
  return `${pageHero('Privacy', 'Your enquiry.\nYour information.', 'How the enquiry feature on this website works.')}<section class="section">
  <div class="container prose">
  <h2>Preparing an enquiry</h2>
  <p>The enquiry form prepares a message in your browser. It does not submit your details to a server or store them in this website’s local storage. You decide whether to send the message through your own email service.</p>
  <h2>Email and telephone</h2>
  <p>If you email or telephone Work Solutions, the information you provide is available to the business so it can discuss and respond to your enquiry. Email attachments are sent through your chosen email service.</p>
  <h2>Website features</h2>
  <p>The homepage and contact page load an official Checkatrade review widget. Your browser connects to Checkatrade to request the widget and current rating, sharing connection information such as your IP address and the website origin. Checkatrade controls the widget and its associated services. You can read more in <a href="https://www.checkatrade.com/privacy">Checkatrade’s privacy notice</a>.</p>
  <p>This website does not add advertising or analytics scripts of its own. Hosting services may process connection information when delivering website pages.</p>
  <h2>Questions about your information</h2>
  <p>Contact <a href="mailto:admin@worksolutions.ltd">admin@worksolutions.ltd</a> to ask about information you have provided to Work Solutions.</p>
  </div>
  </section>`;
}

function getPages({ showSamples = false } = {}) {
  return [
    { path: '/', title: 'Electrical contractors in Somerset & Bristol', description: 'Electrical installations, rewires and ongoing maintenance for contractors, landlords and businesses across Somerset and the Bristol area.', body: home(showSamples) },
    { path: '/services/', title: 'Electrical services', description: 'Explore commercial electrical installations, rewires, HMO packages, fire alarms, emergency lighting and maintenance from Work Solutions.', body: servicesPage() },
    ...services.map(service => ({ path: `/services/${service.slug}/`, title: service.title, description: service.description, body: servicePage(service) })),
    { path: '/maintenance/', title: 'Maintenance & landlord compliance', description: 'Discuss electrical testing, EICR programmes, fire alarm maintenance and emergency lighting for your premises or property portfolio.', body: maintenance() },
    { path: '/projects/', title: 'Electrical projects & case studies', description: 'Explore completed electrical projects, from HMO conversions and commercial distribution upgrades to rewires and life-safety systems.', body: projectsPage() },
    ...projects.map(project => ({ path: `/projects/${project.slug}/`, title: project.title, description: project.summary, body: projectPage(project, showSamples) })),
    { path: '/about/', title: 'About Work Solutions', description: 'Meet Work Solutions, based in Banwell and working with contractors, landlords and businesses across Somerset and the Bristol area.', body: about() },
    { path: '/contact/', title: 'Discuss your electrical project', description: 'Contact Work Solutions on 01934 533 217 or prepare an enquiry about electrical projects, refurbishments and ongoing maintenance.', body: contact(showSamples) },
    { path: '/privacy/', title: 'Privacy information', description: 'How the Work Solutions website prepares your enquiry and how to contact the business about your information.', body: privacy() },
    { path: '/404/', title: 'Page not found', description: 'Find the electrical services, projects or contact information you need from Work Solutions.', body: `${pageHero('404 / Page not found', 'Let’s get you\nback on track.', 'The page you are looking for could not be found.', { action: 'Back to home', actionHref: '/' })}<div class="container related-links">${link('Explore services', '/services/')}${link('Contact us', '/contact/')}</div>` }
  ];
}

module.exports = { getPages };

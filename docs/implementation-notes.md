# Implementation notes and editorial review

## Checkatrade integration

The supplied official widget for company `631458` is embedded once on Home below the hero and once on Contact beside
the enquiry form. The homepage's lower enquiry area links to the profile without loading another widget. This avoids
duplicate rating-schema injection from multiple embeds on the same page.

The supplied Google share URL is linked below the review widget as a secondary profile link. Google returned a JavaScript
challenge to the read-only inspection, so its destination details, rating and review count could not be independently
verified. No Google rating is displayed and no Google widget is loaded.

The remote script was inspected without execution. Read-only API requests showed that the public site origin is accepted
and the local preview origin is rejected. The authorised-origin response was 9.3/10 from 47 reviews over the last 12 months,
with a white widget theme and schema markup enabled. Draft builds show a dated snapshot until the live widget renders;
production builds retain only a profile-link fallback. Privacy text now accounts for the third-party widget connection.

Syntax checks passed and all 19 draft pages were regenerated. No preview server or browser verification was run. Automated
test coverage was extended for embed placement and exclusion of the snapshot from production; execution is still pending.

## Second draft

Updated following the director's review of the first draft on 24 September 2026.

- The homepage now uses a charcoal hero with yellow emphasis, a direct electrical-contracting headline and light reading
  areas below. The main action leads to the homepage enquiry section.
- Wide-screen containers now grow to 86% of the viewport, capped at 2880 CSS pixels. Above 1440 CSS pixels, the root type
  scale grows gradually from 16 to 26 pixels. At a 3840 CSS-pixel viewport the main container is 2880 pixels wide; at 1920
  it is approximately 1651 pixels. Browser zoom and operating-system scaling affect the actual CSS viewport.
- Paragraph widths remain constrained independently of the photography and project grids. Navigation, images and spacing
  scale with larger viewports; small-screen breakpoints remain in place.
- The Projects introduction now names the work directly and shows a real installation photograph rather than the abstract
  brand graphic. This is a general introduction photograph, not a new assignment to a specific case study.
- Home and Contact share a five-field initial enquiry form. Optional company, telephone and timing fields sit in an
  expandable section. The homepage includes the director's portrait, telephone and email alongside the form.
- Testimonial rendering is ready but the collection is empty. Only approved, attributed quotes will appear. Project
  pages show only quotations associated with that project. No ratings or testimonial placeholders are displayed.
- Direct enquiry submission remains pending a hosting/delivery decision; the draft still prepares an email for the
  visitor to send. No response-time promise has been added.

The changed template and test files passed syntax inspection. The automated test suite has been extended for the shared
form and approved testimonial rendering but has not been executed; permission for execution remains outstanding from
the first draft. No preview server or browser session has been started. Run `npm run build` to update the existing
`dist/` preview with this second draft; running a preview alone does not regenerate its files.

See [Collecting and adding testimonials](testimonials.md) for the director's next content step.

## First-draft record

24 September 2026. Standalone static draft based on the approved multipage proposal.

## Delivered structure

Ten core pages, seven individual project pages, a privacy page and a not-found page. The source uses shared CommonJS
templates and structured content; the generated website is ordinary HTML. No server-side application or database is
required to serve it. Build and preview commands are in the repository README.

The design uses the existing Work Solutions logo, black-and-yellow colours, system fonts and selected original photos.
All selected image assets together are approximately 500 KB. Shared CSS is approximately 23 KB and browser JavaScript
approximately 4 KB before transfer compression. These are source sizes, not measured loading-performance results.

## Editorial choices

- Electrical project delivery leads the site, with Maintenance as a main navigation item.
- Service pages distinguish installations, rewires, HMO packages, and fire alarms/emergency lighting.
- Full residential rewires remain represented. Generic small-job messaging has been removed from the draft.
- The homepage uses a photograph of an engineer at solar equipment as a general working-on-site image; it does not claim
  that image shows a particular electrical case study.
- Case studies use supplied scope and restrained outcomes. They do not invent contract values, durations, names or quotes.
- Most case-study covers are typographic graphics until their photographs are identified. These are intentionally designed
  covers, not stock imagery presented as completed work.
- No client-logo strip or commercial testimonials are fabricated. Add these once approved source material is available.
- Current credentials are invited on enquiry rather than asserted while the earlier NICEIC Domestic wording and proposed
  NICEIC Approved Contractor wording remain unresolved. Verified credentials should replace this interim treatment.
- Enquiries prepare an email locally with an explicit review-and-send step. No message is sent by the website itself.

## Photograph provenance

| New asset | Original saved file | Use |
|---|---|---|
| `engineer-solar.webp` | `2.jpg` | General homepage and commercial-service photograph |
| `site-team.webp` | `4.jpg` | General team and maintenance photograph |
| `lighting-work.webp` | `IMG_4407.jpg` | Refurbishment service; student-accommodation lighting case study |
| `lighting-installation.webp` | `IMG_4525.jpg` | General Projects page introduction; specific case-study assignment pending |
| `common-room.webp` | `IMG_4333.jpg` | Prepared asset; project assignment pending |
| `matt-hoy-green.webp` | `Matt+Hoy-Green+-+Director.png` | Director portrait |
| `logo.webp` | `Logo.png` | Existing brand |

The student-accommodation case uses the existing site's description of IMG_4407: work for GSH Projects involving Unite
Students. Confirm the wording and permission before publication. That project was added to make existing, identifiable
photographic evidence available alongside the six supplied case-study outlines.

## Before publication

1. Confirm the legal company identity, registration details, address and contact information.
2. Confirm current NICEIC scheme membership and verification link; establish which other credentials should appear.
3. Review the stated maintenance offer and actual enquiry handling arrangements with the director.
4. Confirm the preferred service area. The draft uses Somerset and the Bristol area; it does not promise nationwide coverage.
5. Supply the photo-to-project mapping, factual project details and approved references for the case-study pages.
6. Review named contractor relationships and publication permissions. No direct public-sector appointments are implied.
7. Choose hosting and decide whether enquiries should continue through email or use a direct submission service.
8. Complete the privacy notice using actual business and hosting practices, including retention and applicable contact
   details. The implemented page describes this draft's technical behaviour and is not a finished organisational policy.
9. Preserve or replace the existing terms PDF when switching hosting; it currently links to the live Squarespace URL.
10. Inspect the rendered site at desktop and mobile widths, check keyboard navigation and contrast, and test real email-app
    handoff before launch. No browser-based visual verification is claimed for this draft.

None of these steps has been treated as permission to publish, contact clients, or alter the existing live website.

## Verification status

All nine JavaScript/CommonJS source and test files passed `node --check` syntax inspection. Optimised image dimensions
and source asset sizes were inspected. Build execution and the automated test suite are awaiting the user's response to
the verification-permission question, in accordance with the working agreement. No preview server has been started and
no browser-based checks have been run. The implementation is source-ready; generated `dist/` output is not yet created.

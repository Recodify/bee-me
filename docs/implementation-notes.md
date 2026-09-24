# Implementation notes and editorial review

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
| `lighting-installation.webp` | `IMG_4525.jpg` | Prepared asset; project assignment pending |
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

# Work Solutions website

A standalone static implementation of the approved multipage proposal. Plain HTML, CSS and a small browser script,
generated with Node.js and CommonJS. There are no package dependencies, remote fonts, trackers, or client-side framework.

## Build and preview

Requires Node.js 22 or newer. No installation step is needed.

```bash
cd /home/sam/code/websites/work-solutions
npm run build
npm run preview
```

Open `http://127.0.0.1:4173`. The preview serves only `dist/` and binds to the local machine. Stop it with Ctrl+C.
Rebuild after editing source files, then refresh the browser. There is no automatic watcher.

To choose a different preview port:

```bash
PORT=8080 npm run preview
```

## Checks

```bash
npm test
```

The checks build into temporary directories and inspect the generated pages, local links, assets, headings, metadata,
and contact-field labels. They also exercise the shipped enquiry script's email generation and clipboard fallback.
They do not start the website or send any enquiry. Responsive visual inspection and real-device checks are separate.

## Editing

| File or directory | Purpose |
|---|---|
| `src/data/services.cjs` | Service copy, questions, related services and featured projects |
| `src/data/projects.cjs` | Case-study facts and confirmed photograph assignments |
| `src/templates/pages.cjs` | Homepage, page bodies, contact and privacy content |
| `src/templates/components.cjs` | Shared navigation, footer, image markup and metadata |
| `public/styles.css` | Responsive layout, colours and typography |
| `public/site.js` | Mobile navigation and enquiry email preparation |
| `public/images/` | Optimised assets copied into the generated site |
| `scripts/build.cjs` | Static page generation |
| `scripts/preview.cjs` | Local-only preview server |
| `tests/` | Integration and browser-script checks |
| `docs/implementation-notes.md` | Content decisions and publication preparation |

To add a case study, add an entry to `src/data/projects.cjs` following the existing fields, then rebuild. Its route and
sitemap entry are created automatically. Image names omit the `.webp` extension. Supply descriptive alternative text
and update the dimensions in the shared `photo` helper when adding a differently sized image.

Each generated route is a directory containing `index.html`. Configure the eventual static host to serve directory
indexes and use `404.html` for missing pages. The local preview returns a genuine 404 for unknown paths.

## Enquiries

The contact form prepares an email for the visitor to review and send. It does not send a request to a backend or claim
that a message has been delivered. It supports opening the visitor's email app or copying the prepared message.
Telephone and direct email links work without JavaScript. Very long messages may exceed an email application's URL
handling limit; the copy-message route remains available.

A direct submission form needs a selected delivery provider or backend, spam protection, failure handling and an updated
privacy notice. Those decisions are not implied by this local draft.

## Indexing and eventual deployment

Draft builds include `noindex` metadata and a disallowing `robots.txt`. This does not make a hosted draft private;
use hosting access controls if needed. The site has not been published.

After editorial review and an explicit decision to publish, an indexable production build can be created with:

```bash
SITE_URL=https://www.worksolutions.ltd SITE_INDEXABLE=1 npm run build
```

Upload only `dist/` to the chosen static host. Do not upload the saved original site, source documents or private project
material. Canonical links, social metadata and the sitemap use `SITE_URL`. Existing terms currently link to the original
site's PDF; preserve or replace that document when changing hosting.

The build overwrites current output paths but does not delete old generated pages. If routes are removed, build into a
fresh output directory for deployment or remove the retired output deliberately. Preserve useful old URLs through host
redirects when replacing an existing public site.

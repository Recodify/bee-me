# Collecting and adding testimonials

## Layout-preview samples

At the user's request, ordinary draft builds now show three visibly labelled fictional quotations on the homepage and
matching samples on the HMO and student-accommodation case studies. They live in `src/data/sample-testimonials.cjs`.
Approved real quotations take precedence. Builds made with `SITE_INDEXABLE=1` omit all fictional samples.

Run `npm run build` and refresh your preview to see them. The collection instructions below apply to real testimonials.

The second draft has space for real testimonials on the homepage and on the matching case-study page. These sections
appear automatically once approved entries exist. Production builds contain no empty section or fictional quotations.

## What to collect

Two or three specific commercial references are a useful starting point. Ask existing clients to describe their own
experience, including the work commissioned, communication, coordination, and whether they have appointed the company
again. Let clients choose their own wording and approve any edits before publication.

Useful questions for a conversation or written request:

- What did Work Solutions do for you?
- What mattered most on that project, and how did the team handle it?
- How was the communication and coordination with other people on the project?
- Have you used the company more than once, and what keeps you working together?
- May we publish your comments with your name, role and organisation, or an agreed alternative attribution?

Collect the exact approved quotation, public attribution, project association and permission to publish. Keep any private
correspondence outside the public website assets. No testimonial requests have been sent as part of this work.

## Add an approved quote

Edit `src/data/testimonials.cjs`. It currently exports an empty array. Each entry uses these fields:

| Field | Content |
|---|---|
| `quote` | The client's actual, approved wording |
| `attribution` | Approved name and role, or agreed anonymous role |
| `context` | Organisation or relationship context, if approved for publication |
| `projectSlug` | Matching slug from `src/data/projects.cjs`; leave empty for a general reference |
| `approved` | Boolean `true` only after permission and wording are agreed |

The homepage shows up to three complete, approved entries in array order. Individual case studies show only entries
whose `projectSlug` matches that case study. The renderer escapes quotation text and excludes unpublished/incomplete
entries. Then regenerate the site:

```bash
npm run build
```

Google ratings are not displayed in this draft. Before adding them, confirm the correct profile, current rating, review
count, permitted presentation and a maintenance method. Link to the actual reviews, and keep ratings distinct from the
selected quotations. A Google widget is not required to present attributed testimonials.

+++
title = "Section-level Configuration Reference"
description = "Reference for the section-level [extra] front matter keys Tapestry reads, with defaults, examples, and behavioural notes."
date = 2026-07-16
authors = ["Anirban Basu"]
insert_anchor_links = "right"

[taxonomies]
tags = ["docs", "configuration"]
categories = ["docs"]

[extra]
copy_button = true
+++

This page documents the `[extra]` front-matter keys Tapestry reads on a
**section's** `_index.md` (e.g. `content/posts/_index.md`,
`content/docs/_index.md`). Some of these override their
[site-level](../site-configuration) equivalents; others are section-specific.
For Zola's own standard section front matter (`title`, `description`,
`sort_by`, `paginate_by`, `template`, `redirect_to`, `transparent`, and so
on), see [Standard Zola front matter](#standard-zola-front-matter) at the
bottom of this page.

## `framed`

```markdown
+++
[extra]
framed = true
+++
```

Adds a `framed` class to the section header. Used by the front page, section
listing, and archive templates.

## `section_path`

```markdown
+++
[extra]
section_path = "/blog/_index.md"
+++
```

Used by the front-page (`index.html`) and archive templates to pull posts
from a different section than the one the template is attached to — e.g.
your homepage `_index.md` can list posts from `content/posts/` without being
that section itself. On the archive template, this defaults to
`/blog/_index.md` if unset.

## `max_posts`

```markdown
+++
[extra]
max_posts = 5
+++
```

Front-page only: caps how many posts from the section named by
`section_path` are listed. Defaults to that section's own `paginate_by`, or
all of its pages if `paginate_by` is unset.

## `stylesheets`

```markdown
+++
[extra]
stylesheets = ["css/section-style.css"]
+++
```

Additive with the site- and page-level `stylesheets` — see
[site-configuration.md](../site-configuration/#stylesheets).

## `katex`

```markdown
+++
[extra]
katex = true
+++
```

Sets the KaTeX default for every page in this section (and its
subsections), unless a page overrides it directly — see
[site-configuration.md](../site-configuration/#katex) for the full
precedence chain.

## `social_media_image`

```markdown
+++
[extra.social_media_image]
path = "section-share-card.png"
alt_text = "A photo representing this section."
+++
```

Same behaviour as the page-level key (see
[page-configuration.md](../page-configuration/#social_media_image)) — used
as the `og:image` fallback for any page in this section that doesn't set its
own.

{% alert(type="note", title="copy_button is inert") %}

`extra.copy_button` is a leftover terminus key with no effect under
Tapestry — see [page-configuration.md](../page-configuration/#sidebar) for
why.

{% end %}

---

## Quick reference

| Key | Type | Default | Notes |
|---|---|---|---|
| `framed` | bool | `false` | Adds a `framed` class to the section header. |
| `section_path` | path | `/blog/_index.md` (archive only) | Section to pull posts from (front page, archive). |
| `max_posts` | integer | section's `paginate_by`, or all pages | Front-page post-count cap. |
| `stylesheets` | array of paths | `[]` | Additive with page/site level. |
| `katex` | bool | inherited | Default for pages in this section. |
| `social_media_image.path` | path | unset | Fallback `og:image` for pages in this section. |
| `social_media_image.alt_text` | string | unset | `og:image:alt` fallback. |
| `copy_button` | bool | — | Inert (terminus leftover). |

---

## Standard Zola front matter

Keys like `title`, `description`, `sort_by`, `paginate_by`,
`paginate_reversed`, `template`, `page_template`, `redirect_to`,
`transparent`, `insert_anchor_links`, and `[taxonomies]` are standard Zola
section front matter, not Tapestry-specific — see
[Zola's own section content documentation](https://www.getzola.org/documentation/content/section/)
for the full reference.

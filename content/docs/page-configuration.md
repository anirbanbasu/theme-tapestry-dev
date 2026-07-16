+++
title = "Page-level Configuration Reference"
description = "Reference for the page-level [extra] front matter keys Tapestry reads, with defaults, examples, and behavioural notes."
date = 2026-07-16
authors = ["Anirban Basu"]
insert_anchor_links = "right"

[taxonomies]
tags = ["docs", "configuration"]
categories = ["docs"]

[extra]
copy_button = true
+++

This page documents the `[extra]` front-matter keys Tapestry reads on
individual **pages** (e.g. `content/about.md`, a blog post). These override
their [site-level](../site-configuration) equivalents where noted. For
Zola's own standard front matter (`title`, `description`, `date`, `updated`,
`authors`, `draft`, `weight`, `slug`, `path`, `template`,
`insert_anchor_links`, `[taxonomies]`, and so on), see
[Standard Zola front matter](#standard-zola-front-matter) at the bottom of
this page.

## `sidebar`

```markdown
+++
title = "My Page"
# [extra]
# sidebar = "sidebar-snippet.md"   # custom content
# sidebar = false                  # force off
+++
```

The single-article template's columns 9–12 sidebar region is content-driven,
not unconditionally reserved:

- Left unset, a sidebar renders automatically once the page has **2 or more**
  headings, as an "on this page" table of contents.
- Set to a **string**, that path is loaded as a colocated Markdown snippet
  (relative to the page's own directory) and rendered into the sidebar
  instead of/alongside the auto TOC.
- Set to **`false`**, no sidebar renders regardless of heading count or a
  custom snippet, and the article reclaims the full 12 columns.

## `stylesheets`

```markdown
+++
[extra]
stylesheets = ["css/one-off-page-style.css"]
+++
```

Additive with the site- and section-level `stylesheets` — see
[site-configuration.md](../site-configuration/#stylesheets). All three
levels' stylesheets are linked together, not just the most specific one.

## `katex`

```markdown
+++
[extra]
katex = true
+++
```

Overrides the site- and section-level `katex` setting for this page only —
see [site-configuration.md](../site-configuration/#katex) for the full
precedence chain. An explicit `true`/`false` here always wins over whatever
is set at the section or site level.

## `social_media_image`

```markdown
+++
[extra.social_media_image]
path = "share-card.png"
alt_text = "A diagram of the proposed architecture."
+++
```

- `path` is a colocated image (relative to the page's own directory),
  automatically resized to 1200×675 and emitted as `og:image` /
  `twitter:card` meta tags.
- `alt_text` is optional but recommended; it becomes `og:image:alt`.
- If unset, the page falls back to the section-level `social_media_image`
  (see [section-configuration.md](../section-configuration/#social_media_image)),
  if any.

{% alert(type="note", title="copy_button is inert") %}

`extra.copy_button` is a leftover terminus key. Tapestry deliberately ships
no copy-to-clipboard JavaScript (per CONSTITUTION.md §2), so setting it here
or at the section/site level is a silent no-op.

{% end %}

---

## Quick reference

| Key | Type | Default | Notes |
|---|---|---|---|
| `sidebar` | string \| bool | auto (TOC if ≥2 headings) | Custom snippet path, or `false` to force off. |
| `stylesheets` | array of paths | `[]` | Additive with section/site level. |
| `katex` | bool | inherited | Overrides section/site level for this page. |
| `social_media_image.path` | path | unset | Colocated image, resized to 1200×675 for `og:image`. |
| `social_media_image.alt_text` | string | unset | `og:image:alt`. |
| `copy_button` | bool | — | Inert (terminus leftover). |

---

## Standard Zola front matter

Keys like `title`, `description`, `date`, `updated`, `authors`, `draft`,
`weight`, `slug`, `path`, `template`, `insert_anchor_links`, and
`[taxonomies]` are standard Zola front matter, not Tapestry-specific — see
[Zola's own page content documentation](https://www.getzola.org/documentation/content/page/)
for the full reference.

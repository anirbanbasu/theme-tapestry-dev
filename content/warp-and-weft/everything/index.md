+++
title = "Everything"
description = "One page exercising every markdown construct, shortcode, and KaTeX math that Tapestry supports."
date = 2026-07-11

[taxonomies]
tags = ["test-fixture"]

[extra]
katex = true
+++

This page exists solely as a fixture for Tapestry's automated test suite. It
exercises every markdown construct and custom shortcode the theme supports, so
a single visual/accessibility pass over this one page (per style/variant/mode)
covers the single-article template's feature surface without depending on the
site's real demo content.

<!-- more -->

## Headings

The following `<h1>`–`<h6>` elements represent six levels of section headings.

# H1

## H2

### H3

#### H4

##### H5

###### H6

## Paragraph and emphasis

Regular paragraph text with **bold**, _italic_, ~~strikethrough~~, and `inline
code`. Here is [a link](#headings) and here is an autolink: <https://example.com>.

## Blockquotes

### Without attribution

> **Note** that you can use _Markdown syntax_ within a ~~blockquote~~.

### With attribution and a footnote

> Don't communicate by sharing memory, share memory by communicating.
>
> — <cite>Rob Pike[^1]</cite>

[^1]: Excerpted from Rob Pike's talk during Gopherfest, November 18, 2015.

## GitHub-style alerts (native syntax)

> [!NOTE]
> Some **content** with _Markdown_ `syntax`.

> [!TIP]
> Some **content** with _Markdown_ `syntax`.

> [!IMPORTANT]
> Some **content** with _Markdown_ `syntax`.

> [!WARNING]
> Some **content** with _Markdown_ `syntax`.

> [!CAUTION]
> Some **content** with _Markdown_ `syntax`.

## Alert shortcode

{{ alert(type="note", text="Some **content** with _Markdown_ `syntax`.") }}
{{ alert(type="tip", text="Some **content** with _Markdown_ `syntax`.") }}
{{ alert(type="info", text="Some **content** with _Markdown_ `syntax`.") }}
{{ alert(type="warning", text="Some **content** with _Markdown_ `syntax`.") }}
{{ alert(type="danger", text="Some **content** with _Markdown_ `syntax`.") }}

## Mastodon shortcode

{{ mastodon(url="https://hachyderm.io/@ebkalderon/114462281016082381") }}

## References shortcode

{% references() %}

Alderson, E. (2015). Cybersecurity and Social Justice: A Critique of Corporate
Hegemony in a Digital World. _New York Journal of Technology, 11_ (2), 24-39.

Funkhouser, M. (2012). The Social Norms of Indecency: An Analysis of Deviant
Behavior in Contemporary Society. _Los Angeles Journal of Sociology, 16_ (3),
41-58.

{% end %}

## Responsive image shortcode

{{ responsive_image(src="example-hi-res-image.jpg", alt="Responsive hi-res image", caption="A responsive image with a caption.") }}

## Wide container shortcode

{% wide_container() %}

| Title            | Year | Director             | Genre         | IMDb |
|------------------|------|-----------------------|---------------|------|
| Beoning          | 2018 | Lee Chang-dong        | Drama/Mystery | 7.5  |
| The Master       | 2012 | Paul Thomas Anderson  | Drama/History | 7.1  |
| The Tree of Life | 2011 | Terrence Malick       | Drama         | 6.8  |

{% end %}

## Presentation palette shortcode

{{ presentation_palette() }}

## Light mode only / dark mode only shortcodes

{% light_mode_only() %}
You're seeing this because the site is currently in **light** mode.
{% end %}

{% dark_mode_only() %}
You're seeing this because the site is currently in **dark** mode.
{% end %}

## Tables

Name  | Age
------|----
Bob   | 27
Alice | 23

### Inline markdown within tables

| Italics   | Bold     | Code   |
|-----------|----------|--------|
| _italics_ | **bold** | `code` |

## List types

### Ordered list

1. First item
2. Second item
3. Third item

### Unordered list

- List item
- Another item
- And another item

### Nested unordered list

- Fruit
  - Apple
  - Orange
- Dairy
  - Milk
  - Cheese

### Nested ordered list

1. Fruit
    - Apple
    - Orange
2. Dairy
    1. Milk
    2. Cheese

### Task list

- [x] Completed item
- [ ] Incomplete item
  - [x] Nested completed item
  - [ ] Nested incomplete item

## Preformatted text

```console
This text is preformatted!
   This hanging indent is preserved.
```

## Code blocks

### Regular

```rust
fn main() {
    println!("Hello, world!");
}
```

### With line numbers and a highlighted line

```rust,linenos,hl_lines=3
use std::collections::HashMap;

fn main() {
    let mut map = HashMap::new();
    map.insert("key", "value");
}
```

## Other elements — abbr, sub, sup, kbd, details, mark

<abbr title="Graphics Interchange Format">GIF</abbr> is a bitmap image format.

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Press <kbd>CTRL</kbd>+<kbd>ALT</kbd>+<kbd>Delete</kbd> to end the session.

<details>
<summary>Something wicked this way comes</summary>

**Boo!** Ha ha, scared ya!
</details>

Most <mark>salamanders</mark> are nocturnal.

## KaTeX math

Inline math: $\KaTeX$ renders $e^{i\pi} + 1 = 0$ right in the sentence.

Display math:

$$
\displaystyle \left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)
$$

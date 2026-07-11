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

The following `<h1>`–`<h6>` elements represent six levels of section headings in Markdown.

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

> Nature isn't classical, dammit, and if you want to make a simulation of nature, you'd better make it quantum mechanical.
>
> — <cite>Richard Feynman[^1]</cite>

[^1]: Excerpt from Richard Feynman's "Simulating physics with computers" in the International Journal of Theoretical Physics, June, 1982. [DOI](https://doi.org/10.1007/BF02650179).

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

Zhang, T., Patil, S. G., Jain, N., Shen, S., Zaharia, M., Stoica, I., & Gonzalez, J. E. (2024). _Raft: Adapting language model to domain specific rag_. arXiv preprint arXiv:2403.10131.

Braccini, L., Serafini, A., & Bose, S. (2026). _Mass-Independent Gravitationally Induced Entanglement_. arXiv preprint arXiv:2602.19306.

{% end %}

## Responsive image shortcode

{{ responsive_image(src="example-hi-res-image.jpg", alt="Responsive hi-res image", caption="A winter morning moon, about to set, aligned perfectly with Mt. Fuji in Japan.") }}

## Wide container shortcode

{% wide_container() %}

| Title            | Year | Director             | Genre         | IMDb rating * |
|------------------|------|-----------------------|---------------|------|
| Enola Holmes 3   | 2026 | Philip Barantini      | Drama/Mystery | 5.8/10  |
| The Matrix | 1999 | Lana Wachowski, Lilly Wachowski  | Action/Sci-Fi  | 8.7/10  |
| The Shawshank Redemption  | 1994 | Frank Darabont  | Drama | 9.3/10  |

_* IMDb ratings as of 2026-07-11._

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
Claire | 26
Dave | 25

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
    println!("Ahoy, matey!");
}
```

### With line numbers and a highlighted line

```rust,linenos,hl_lines=3
use std::collections::HashMap;

fn main() {
    let mut map = HashMap::new();
    map.insert("a-key", "a-value");
}
```

## Other elements — abbr, sub, sup, kbd, details, mark

<abbr title="Graphics Interchange Format">SVG</abbr> is a vector image format.

O<sub>2</sub>

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Press <kbd>CTRL</kbd>+<kbd>ALT</kbd>+<kbd>Delete</kbd> to end the session.

<details>
<summary>Something unexpected, comes this way!</summary>

**010 + 011 = 101** yes, in the binary number system! The decimal equivalent of this is 2 + 3 = 5.
</details>

The <mark>Higgs boson</mark> has no spin, which makes it the only fundamental particle observed in nature with no intrinsic angular momentum.

## KaTeX math

Inline math: $\KaTeX$ renders $(i\gamma^\mu \partial_\mu - m)\psi = 0$ right in the sentence.

Display math (Schrödinger equation):

$$
\displaystyle i\hbar \frac{\partial}{\partial t} \Psi(\mathbf{r}, t) = \left[ -\frac{\hbar^2}{2m} \nabla^2 + V(\mathbf{r}, t) \right] \Psi(\mathbf{r}, t)
$$

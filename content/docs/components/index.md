+++
title = "Components"
date = 2026-07-05
authors = ["Anirban Basu", "Bhombol Dachshund"]
aliases = ["docs/shortcodes"]

[taxonomies]
tags = ["docs", "authoring", "components"]
categories = ["docs"]

[extra.social_media_image]
path = "example-hi-res-image.jpg"
alt_text = "A photograph of a winter moon setting over a snow-capped Mt. Fuji as seen from Tokyo, Japan."
+++

This theme includes some useful custom components that you can use to enhance
your posts. Whether you want to display a gallery of images, or format a
professional-looking reference section, these custom components have got you
covered.

{% <alert type="note" title="Terminology note"> %}
Zola 0.22.x called these **shortcodes**. Zola 0.23's Tera v2 rewrite removed
the shortcode subsystem entirely and replaced it with a component system —
what you see below are Tera v2 components, invoked from Markdown with the
same {% raw %}`{{ <name ... /> }}` / `{% <name> %}...{% </name> %}`{% endraw %}
syntax. The name changed; the authoring experience didn't.
{% </alert> %}

<!-- more -->

## Alert Component

Bring attention to information with these GitHub-style alert components. They
come in five `type`s: `note`, `tip`, `info`, `warning`, and `danger`.

{{ <alert type="note" text="Some **content** with _Markdown_ `syntax`. Here is [a `link`](#alert-component)." /> }}
{{ <alert type="tip" text="Some **content** with _Markdown_ `syntax`. Here is [a `link`](#alert-component)." /> }}
{{ <alert type="info" text="Some **content** with _Markdown_ `syntax`. Here is [a `link`](#alert-component)." /> }}
{{ <alert type="warning" text="Some **content** with _Markdown_ `syntax`. Here is [a `link`](#alert-component)." /> }}
{{ <alert type="danger" text="Some **content** with _Markdown_ `syntax`. Here is [a `link`](#alert-component)." /> }}

You can change the `title` and `icon` of the alert. Both parameters take a
string and default to the type of alert. `icon` can be any of the available
alert types.

{{ <alert type="note" title="Custom title and icon" icon="tip" text="Some **content** with _Markdown_ `syntax`. Here is [a `link`](#alert-component)." /> }}

### Usage

You can use alerts in two ways:

1. Inline with parameters:

   {% raw %}

   ```jinja
   {{ <alert type="danger" icon="tip" title="An important tip" text="Stay hydrated~" /> }}
   ```

   {% endraw %}

2. With a content body:

   {% raw %}

   ```jinja
   {% <alert type="danger" icon="tip" title="An important tip"> %}
   Stay hydrated~

   This method is particularly useful for longer content or multiple paragraphs.
   {% </alert> %}
   ```

   {% endraw %}

Both methods support the same parameters (`type`, `icon`, and `title`), with the
content either passed as the `text` parameter or as the body between tags.

{% <alert type="note"> %}
[Zola 0.21.0](https://github.com/getzola/zola/releases/tag/v0.21.0) added
support for GitHub-flavored Markdown alert syntax. This notation may be used in
place of the `alert` component, if desired.

```markdown
> [!NOTE]
> This is a note.
```

However, the quality of the generated HTML is quite poor compared to the `alert`
component, both semantics-wise and accessibility-wise, so its use is not
recommended.

See [getzola/zola#2817](https://github.com/getzola/zola/issues/2817) for more
details.
{% </alert> %}

## Mastodon Component

Embed a Mastodon post into your content using the `mastodon` component.

{{ <mastodon url="https://hachyderm.io/@ebkalderon/114462281016082381" /> }}

### Usage

{% raw %}

```jinja
{{ <mastodon url="https://hachyderm.io/@ebkalderon/114462281016082381" /> }}
```

{% endraw %}

## References

This component formats a reference section with a hanging indent like so:

{% <references> %}

Alderson, E. (2015). Cybersecurity and Social Justice: A Critique of Corporate
Hegemony in a Digital World. _New York Journal of Technology, 11_ (2), 24-39.
[https://doi.org/10.1007/s10198-022-01497-6](https://doi.org/10.1007/s10198-022-01497-6).

Funkhouser, M. (2012). The Social Norms of Indecency: An Analysis of Deviant
Behavior in Contemporary Society. _Los Angeles Journal of Sociology, 16_ (3),
41-58. [https://doi.org/10.1093/jmp/jhx037](https://doi.org/10.1093/jmp/jhx037).

Schrute, D. (2005). The Beet Farming Revolution: An Analysis of Agricultural
Innovation. _Scranton Agricultural Quarterly, 38_ (3), 67-81.

Steinbrenner, G. (1997). The Cost-Benefit Analysis of George Costanza: An
Examination of Risk-Taking Behavior in the Workplace. _New York Journal of
Business, 12_ (4), 112-125.

Winger, J. A. (2010). The Art of Debate: An Examination of Rhetoric in Greendale
Community College's Model United Nations. _Colorado Journal of Communication
Studies, 19_ (2), 73-86.
[https://doi.org/10.1093/6seaons/1movie](https://doi.org/10.1093/6seaons/1movie).

{% </references> %}

### Usage

{% raw %}

```jinja
{% <references> %}

Your references go here.

Each in a new line. Markdown (links, italics...) will be rendered.

{% </references> %}
```

{% endraw %}

## Responsive Image Component

Convert a high-resolution source image into a responsive image using the
`responsive_image` component.

{{ <responsive_image page={page} config={config} src="example-hi-res-image.jpg" alt="Responsive hi-res image" /> }}

By default, `responsive_image` will generate **at most** five versions of the
source image, with the following maximum widths (measured in pixels):

1. 640×_height_
2. 784×_height_
3. 1280×_height_
4. 1920×_height_
5. 2560×_height_

The browser will automatically select the smallest possible resolution while
still retaining visual sharpness. Which image the browser displays depends on
the device's native screen resolution, pixel density, viewport size, etc.

### Usage

{% raw %}

```jinja
{{ <responsive_image page={page} config={config} src="example-hi-res-image.jpg" alt="Responsive hi-res image" /> }}
```

{% endraw %}

The default behavior of the `responsive_image` component can be overridden by
adding the following lines to your website's `config.toml`.

```toml
[extra.responsive_images]
widths = [640, 784, 1280, 1920, 2560]
fallback_width = 1280
```

Responsive images are lazy-loaded by default to improve performance for
below-the-fold content ([see MDN docs]). This behavior can be overridden on a
case-by-case basis by passing `lazy=false` to the `responsive_image` component.

[see MDN docs]: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img#loading

## Wide Container Component

Use this component if you want to have a wider table, paragraph, code block...
On desktop, it will take up the width of the article. It will have no effect on
mobile, except for tables, which will get a horizontal scroll.

{% <wide_container> %}

| Title             |  Year | Director             | Cinematographer       | Genre         | IMDb  | Duration     |
|-------------------|-------|----------------------|-----------------------|---------------|-------|--------------|
| Beoning           | 2018  | Lee Chang-dong       | Hong Kyung-pyo        | Drama/Mystery | 7.5   | 148 min      |
| The Master        | 2012  | Paul Thomas Anderson | Mihai Mălaimare Jr.   | Drama/History | 7.1   | 137 min      |
| The Tree of Life  | 2011  | Terrence Malick      | Emmanuel Lubezki      | Drama         | 6.8   | 139 min      |

{% </wide_container> %}

### Usage

{% raw %}

```jinja
{% <wide_container> %}

Place your code block, paragraph, table… here.

Markdown will of course be rendered.

{% </wide_container> %}
```

{% endraw %}

## Presentation Palette Component

Display the site's currently active presentation style and variant, along
with a light/dark colour-palette swatch grid, using the `presentation_palette`
component. It takes no parameters — it reads `extra.presentation_style` and
`extra.presentation_variant` directly from your site's `config.toml`, with the
same fallback rules the theme itself uses (see CONSTITUTION.md §7), so the
name and swatches shown always match whichever group/variant your site is
actually configured for.

{{ <presentation_palette config={config} /> }}

### Usage

{% raw %}

```jinja
{{ <presentation_palette config={config} /> }}
```

{% endraw %}

## Light Mode Only / Dark Mode Only Components

Show content only while the site is in light mode, or only while it's in dark
mode, using the `light_mode_only` and `dark_mode_only` components. Neither
takes any parameters — just wrap the content you want to restrict as the
component's body.

Visibility is done with pure CSS (no extra JavaScript beyond the theme
switcher this theme already ships): if JavaScript is disabled, each component
falls back to your system's `prefers-color-scheme` instead of showing both, or
neither.

{% <light_mode_only> %}
You're seeing this because the site is currently in **light** mode.
{% </light_mode_only> %}

{% <dark_mode_only> %}
You're seeing this because the site is currently in **dark** mode.
{% </dark_mode_only> %}

### Usage

{% raw %}

```jinja
{% <light_mode_only> %}

Only shown while the site is in light mode.

{% </light_mode_only> %}
```

{% endraw %}

{% raw %}

```jinja
{% <dark_mode_only> %}

Only shown while the site is in dark mode.

{% </dark_mode_only> %}
```

{% endraw %}

The body supports Markdown, and other components may be nested inside it, for
example:

{% raw %}

```jinja
{% <light_mode_only> %}

{{ <alert type="tip" text="This tip is only shown in light mode." /> }}

{% </light_mode_only> %}
```

{% endraw %}

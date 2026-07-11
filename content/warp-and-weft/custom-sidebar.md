+++
title = "Custom Sidebar"
description = "A page pointing extra.sidebar at a colocated Markdown snippet, exercising the custom-sidebar-content state (CONSTITUTION.md §5)."
date = 2026-07-11

[taxonomies]
tags = ["test-fixture"]

[extra]
sidebar = "content/warp-and-weft/custom-sidebar-snippet.txt"
+++

This page sets `extra.sidebar` to a path pointing at a colocated Markdown
snippet (`custom-sidebar-snippet.txt` — a non-`.md` extension so Zola's
content scanner doesn't treat it as its own page), which the theme loads via
`load_data(format="plain") | markdown` and renders above the automatic table
of contents in the sidebar region.

## First heading

Enough content, and enough headings below, for the automatic "on this page"
table of contents to also appear underneath the custom sidebar content.

## Second heading

A second heading, so the auto-TOC has more than one entry to list.

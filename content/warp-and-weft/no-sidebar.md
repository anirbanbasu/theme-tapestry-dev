+++
title = "No Sidebar"
description = "A page with headings that would normally trigger an automatic table of contents, but forces the sidebar off — the article must reclaim all 12 grid columns."
date = 2026-07-11

[taxonomies]
tags = ["test-fixture"]

[extra]
sidebar = false
+++

This page has enough headings below to qualify for the automatic "on this
page" table of contents, but sets `extra.sidebar = false` in its front matter
to force the sidebar off regardless. The article body must reclaim the full
12 grid columns instead of leaving columns 9–12 empty.

## First heading

Enough content to make this a real heading.

## Second heading

A second heading, which would normally push the heading count to 2 and
trigger the automatic sidebar TOC — if the explicit override above weren't
set.

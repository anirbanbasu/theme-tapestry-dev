+++
title = "Archive View"
template = "archive.html"

[extra]
section_path = "warp-and-weft/_index.md"
+++

This section exists so the automated test suite can exercise the
`archive.html` template without depending on the real `/archive/` page, which
may be renamed, restructured, or removed independently of this test suite. It
groups `warp-and-weft`'s own fixture pages by year.

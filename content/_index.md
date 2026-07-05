+++
title = "Front Page"
+++

<div style="display:flex; flex-wrap:wrap; gap:1.5rem; align-items:center; margin:1.5rem 0;">
  <div style="flex:0 0 auto;">
    <div style="width:160px;height:160px;border-radius:50%;background:var(--colour-bg-secondary);display:flex;align-items:center;justify-content:center;">
      <div role="img" aria-label="Placeholder profile mark for Dr. Sam Okafor" style="width:96px;height:96px;background-color:var(--colour-text-heading);-webkit-mask:url(profile-mark.svg) center/contain no-repeat;mask:url(profile-mark.svg) center/contain no-repeat;"></div>
    </div>
  </div>
  <div style="flex:1 1 320px; min-width:0;">

## Dr. Sam Okafor

Critical Data Studies Lab — Digital Humanities & Network Analysis

Quiatem. Nam omnis sum am facea corem alique molestrunt et eos evelece
arcillit ut aut eos eos nus, sin conecerem erum fuga, working at the
intersection of history, computation, and social justice.

  </div>
</div>

## Hello there! 👋🏼

Welcome to a demo of `tapestry`, a Zola theme for academic and industry
researcher profile websites, derived from and backward-compatible with
[terminus](https://github.com/ebkalderon/terminus).

## Mapping Archival Silences with Network Analysis

Xerum quo qui aut unt expliquam qui dolut labo, aque venitatiusda cum
voluptionse latur sitiae dolessi aut parist aut dollo enim qui voluptate ma
dolestendit peritin re plis aut quas inctum laceat, using graph-based methods
to make visible what colonial-era archives systematically omitted.

Quianimin porecus evelectur cum que nis nust voloribus ratem aut omnimi,
building on the methodology outlined in our lab's open notebook and
extended here to a new corpus of nineteenth-century shipping ledgers.

> The archive is not a neutral repository of facts but a shaping force in
> its own right.
>
> — <cite>Michel-Rolph Trouillot</cite>

### Notebook excerpt

The co-mention graph was built with `networkx`, exported for visual analysis:

```python
import networkx as nx

G = nx.Graph()
G.add_edges_from(comention_pairs)
centrality = nx.betweenness_centrality(G)
```

Itatur quiatae cullecum rem ent aut odis in re eossequodi nonsequ idebis ne
sapicia is sinveli squiatum, with the full interactive graph linked from the
lab's project page.

<div class="post-tags"><span>#digital-humanities</span> <span>#network-analysis</span> <span>#archives</span></div>

{{ presentation_palette() }}

Please feel free to look around!

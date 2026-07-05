+++
title = "Front Page"
+++

<div style="display:flex; flex-wrap:wrap; gap:1.5rem; align-items:center; margin:1.5rem 0;">
  <div style="flex:0 0 auto;">
    <div style="width:160px;height:160px;border-radius:50%;background:var(--colour-bg-secondary);display:flex;align-items:center;justify-content:center;">
      <div role="img" aria-label="Dr. B. Dachshund" style="width:160px;height:160px;border-radius:50%;background-color:var(--colour-text-heading);-webkit-mask:url(profile.svg) center/contain no-repeat;mask:url(profile.svg) center/contain no-repeat;"></div>
    </div>
  </div>
  <div style="flex:1 1 320px; min-width:0;">

## Dr. B. Dachshund &#x1F43E;

_Critical Sniffing, Burrowing and Barking Laboratory_

This isn't my usual research field but I am here to give you a demo of the `tapestry` theme, a Zola theme for academic and industry researcher profile websites. It has been derived from and mostly backward-compatible with the [terminus](https://github.com/ebkalderon/terminus) theme.
  </div>
</div>

{% light_mode_only() %}
{{ alert(type="danger", title="My profile picture glows in the dark!", text="Don't believe me? Try switching to the dark mode!") }}
{% end %}

{% dark_mode_only() %}
{{ alert(type="info", title="I look scary in the dark?", text="Don't like my glowing profile picture? Try switching to the light mode!") }}
{% end %}


### A _woof woof hello world_ of sorts in Python

I was told to explain something complex, beyond using my exceptional barking skills, and also write it out in code. So, here it is.

The [Collatz conjecture](https://en.wikipedia.org/wiki/Collatz_conjecture) is a famous unsolved problem in mathematics. It is named after the German mathematician Lothar Collatz, who first proposed it in 1937. It states something along the following lines.

> Start with any positive integer $n$. Then each term is obtained from the previous term as follows: if the previous term is even, the next term is one half of the previous term. If the previous term is odd, the next term is 3 times the previous term plus 1.

Despite its simple definition, the conjecture has proven to be very difficult to prove or disprove, and it remains an open question in mathematics. Following is a simple function implementation in the Python language that prints the numbers of the Collatz sequence given an initial positive integer `n`.

```python
def collatz(n):
    if not isinstance(n, int) or n < 1:
        raise ValueError("n must be a positive integer")
    while n != 1:
        print(n)
        n = n // 2 if n % 2 == 0 else 3 * n + 1
    print(1)
```

As you may have noticed, this simple introduction shows some important features, such as blockquotes and code blocks. Please feel free to look around by browsing the other pages from the navigation menu.

### Presentation style and colour palette

{{ presentation_palette() }}

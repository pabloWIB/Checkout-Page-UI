# Checkout Page UI

A static checkout screen — contact details, shipping address and a live order summary — built with plain HTML, CSS and JavaScript.

[![Live demo](https://img.shields.io/badge/demo-checkout.wib.digital-2ea44f)](https://checkout.wib.digital)
[![Hire me on Fiverr](https://img.shields.io/badge/Hire%20me%20on-Fiverr-1DBF73?style=for-the-badge&logo=fiverr&logoColor=white)](https://www.fiverr.com/pablonietop)
![Dependencies](https://img.shields.io/badge/npm%20dependencies-0-brightgreen)
![Build step](https://img.shields.io/badge/build%20step-none-lightgrey)

## Description

Checkout is where carts are abandoned, and layout does most of the damage: too many fields at
once, no sense of how much is left, a total that scrolls away the moment you start typing. This
screen goes the other way — contact information and shipping address in a fixed order down one
column, with the order summary pinned beside it from 1024px up and moved above the form on
narrower screens, so the total is always the first thing you see.

Two things actually work rather than being drawn. The quantity steppers recalculate the subtotal
and the total from `data-price` attributes on each product line, so the summary can never drift
out of sync with what is rendered. The form validates on blur and on submit, marks the offending
fields inline, moves focus to the first one and reports how many are left.

There is no backend. Nothing is charged, nothing is stored and no request leaves the page: on a
valid submit the form says exactly that instead of pretending an order was placed.

## Features

- Live order total — quantity steppers drive the subtotal and total through `Intl.NumberFormat`,
  clamped between 1 and 99 per line.
- Inline form validation built on native constraints (`required`, `type`, `pattern`,
  `minlength`), with error messaging taken over by JavaScript so it renders in the page instead
  of in browser bubbles. Without JavaScript the native constraints still apply.
- Mobile-first responsive layout at 480 / 768 / 1024px, with no horizontal scroll at any width
  from 320px up.
- Accessibility: landmark structure, every input labelled and wired to its error via
  `aria-describedby`, live regions on the totals and quantities, a visible focus ring on every
  interactive element, and 44 × 44px minimum tap targets.
- Design tokens in `:root` — colour, spacing, type, radii and motion — on a 4/8/16/24/32/48/64/96
  spacing scale.
- Zero dependencies, zero build step, ~79 KB total.

## Tech stack

| Layer | Technology | Role in project |
|---|---|---|
| Markup | HTML5 | `index.html` and `404.html`, with an inline SVG sprite for field icons |
| Styling | CSS3 | Custom properties, grid, flexbox; split into base / layout / components |
| Scripting | JavaScript (ES5-compatible, no modules) | Classic scripts so the page also runs from `file://` |
| Fonts | Montserrat, from Google Fonts | `preconnect` + `display=swap` |
| Images | WebP | Product photography |

No framework, no bundler, no package manager. There is no `package.json`.

## Project structure

```
.
├── index.html                    # The checkout screen
├── 404.html                      # Not-found page, links back to index.html
├── robots.txt                    # Allows everything except /docs/
├── sitemap.xml                   # Single URL — the site is one page
├── assets/
│   ├── css/
│   │   ├── base.css              # Tokens, reset, typography, utilities
│   │   ├── layout.css            # Container, page grid, header, footer, 404
│   │   └── components.css        # Fields, buttons, products, steppers, totals
│   ├── js/
│   │   ├── main.js               # Entry point — wires modules to the DOM
│   │   └── modules/
│   │       ├── cart.js           # Quantity steppers and total calculation
│   │       └── checkout-form.js  # Validation and submit messaging
│   └── img/
│       ├── content/              # Two product photographs (WebP)
│       └── icons/                # favicon.svg and its PNG fallback
└── docs/
    ├── auditoria.md              # Audit of the pre-reorganisation codebase
    └── cambios.md                # Change log, grouped by phase
```

Field icons are not files. They live in an inline `<symbol>` sprite at the top of `index.html`,
which removes nine requests and lets each icon inherit its colour from the control it sits in.

## Running it locally

Open `index.html` in a browser. That is the whole setup — scripts are classic (not ES modules)
specifically so the page works over `file://`.

To serve it over HTTP instead:

```bash
npx serve .
# or
python -m http.server 4173
```

## Configuration

There is nothing to configure and no credentials of any kind. If you point this at a real
backend, the place to do it is the submit handler in `assets/js/modules/checkout-form.js`, which
currently calls `event.preventDefault()` and reports the validation result:

```javascript
form.addEventListener("submit", function (event) {
  event.preventDefault();
  // validation runs here, then POST the collected fields to your endpoint
});
```

Product lines, prices and the shipping cost are literal values in `index.html`. Prices are read
from `data-price` on each `[data-product]` element and shipping from `data-shipping` on
`[data-cart]`, so changing a number in the markup is enough — the totals follow.

## Deployment

Deployed on Vercel at [checkout.wib.digital](https://checkout.wib.digital). Static: upload the
repository root as-is, no build command and no output directory. All internal paths are relative
and lowercase, so it also works from a subdirectory.

If you deploy somewhere else, update the absolute URLs in `sitemap.xml`, `robots.txt` and the
`canonical` / `og:url` tags in both HTML files.

## Author

**Pablo Nieto Pérez** — [wib.digital](https://wib.digital)
GitHub: [@pabloWIB](https://github.com/pabloWIB)

## Hire me

I build **custom internal tools, CRMs and dashboards** for small teams, and
**conversion-focused websites** for businesses.

- [Custom internal tool, CRM or dashboard](https://www.fiverr.com/pablonietop/build-a-custom-internal-app-for-your-business) — from $45
- [Conversion-focused website](https://www.fiverr.com/pablonietop/convert-your-landing-page-design-to-code) — from $80
- [All my services on Fiverr](https://www.fiverr.com/pablonietop)
- [wib.digital](https://wib.digital)

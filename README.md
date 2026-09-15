# 🐾 Pet Emporium

A pet-supplies e-commerce storefront built with **Angular 22** — standalone
components, signals for all state, the new `@if`/`@for` control-flow syntax,
zoneless change detection, and lazy-loaded routes.

## Features

- **Product catalog** — 12 products across Dogs, Cats, Fish, Birds, and Small
  Pets, with live search and category filtering (`ProductService`, signal-based).
- **Product detail page** — quantity stepper, stock status, "Add to cart" / "Buy now".
- **Shopping cart** — quantity editing, line removal, free-shipping progress,
  live subtotal/shipping/tax/total (`CartService`, all derived via `computed()`).
- **Checkout** — a `ReactiveFormsModule` form (shipping + payment) with
  validation and inline error messages. No real payment is processed.
- **Order confirmation** — summary of the placed order (`OrderService`).

## Requirements

- Node.js **22.22.3+**, **24.15.0+**, or **26+** (Angular CLI 22's minimum).
- npm 10+

> If your local Node patch version is slightly behind (e.g. 22.22.2), either
> upgrade Node, or see the note at the bottom of this file for a one-line
> workaround used to build this project.

## Getting started

```bash
npm install
npm start        # ng serve, http://localhost:4200
```

## Build

```bash
npm run build     # outputs to dist/pet-emporium
```

## Project structure

```
src/app/
  models/product.model.ts        # Product, CartLine, Order, etc.
  services/
    product.service.ts           # catalog + search/filter signals
    cart.service.ts              # cart state + derived totals
    order.service.ts             # places & stores the last order
  components/
    header/                      # nav + live cart badge
    product-list/                # shop page (search, filters, grid)
    product-detail/              # single product page
    cart/                        # cart page
    checkout/                    # shipping + payment form
    order-confirmation/          # post-checkout summary
```

## Notes

- State is managed entirely with Angular **signals** (`signal`, `computed`) —
  no NgRx/RxJS store needed for an app this size.
- Routes are lazy-loaded via `loadComponent()`.
- Free shipping kicks in automatically once the cart subtotal reaches $75.
- If `ng build`/`ng serve` refuses to run because your installed Node.js
  patch version is one point release behind the CLI's minimum, you can
  relax the check locally by editing
  `node_modules/@angular/cli/src/utilities/node-version.js` and lowering
  the required patch number in `SUPPORTED_NODE_VERSIONS` — or simply
  upgrade Node, which is the recommended fix.

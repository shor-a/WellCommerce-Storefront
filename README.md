# About WellCommerce

Full-featured e-commerce storefront built with React 19, shadcn, and Tailwind CSS v4. Product discovery, cart management, multi-method checkout, and order tracking.

**Live:** https://wellcommerce.pages.dev

---

## Design Origin

The initial design comes from a Figma community freebie by **[Hamza Naeem](https://www.figma.com/files/team/1257686825828261983/resources/community/@hamzauix)**. This implementation follows the source faithfully, then extends it with additional pages, interactive states, and accessibility attributes the original file does not include.

**Original Figma file:** https://www.figma.com/community/file/1273571982885059508/e-commerce-website-template-freebie

---

## Features

### Product Discovery

- Homepage with New Arrivals and Top Selling showcases, brand statistics, and a brand logo strip
- Browse page with a filter sidebar: category, price range (dual-handle slider), color swatches, size pills, and dress style
- Sort by Most Popular, Newest, Price Low–High, Price High–Low; client-side pagination at 9 products per page
- Product detail page with image thumbnails, color/size selectors, quantity stepper, star ratings, and tabbed reviews
- "You might also like" recommendations on every product page
- Search bar that collapses to an icon toggle below 1150 px of visual viewport width, responding to both window resize and browser zoom

### Cart and Wishlist

- Persistent cart via Zustand + localStorage, items survive page refreshes and tab closes
- Add to cart with variant selection (color, size, quantity); duplicate detection merges quantities
- Cart page with inline quantity controls, per-item removal, and an order summary with discount breakdown
- Wishlist with the same persistence model, toggle-to-add behavior, and a dedicated wishlist view under Order History

### Checkout

- Shipping address form with required-field validation
- Three payment methods: Credit Card (card number, expiry, CVV with live formatting), PayPal, and Google Pay
- Submit triggers a four-step animated progress modal: Validating → Processing → Confirmed → Complete
- Cart-route guard prevents direct navigation to `/checkout` with an empty cart
- Order is written to the order history store on completion and the cart is cleared

### Authentication and Routing

- Login and Register pages with React Hook Form + Zod schema validation
- Password visibility toggle, Remember Me checkbox, and social sign-in buttons (Google, Apple)
- `PrivateRoute` redirects unauthenticated users to `/login`
- `GuestRoute` redirects already-authenticated users away from `/login` and `/register`
- `CartRoute` blocks checkout entry when the cart is empty

### Order History

- Expandable order cards with a per-order tracking bar animating across four steps
- Status badges (Processing, Delivered, Cancelled), cancel/remove actions with confirmation modals
- Filter and sort by status and date; mobile filter sheet

### Account Settings

- Personal information form with name and email fields
- Change password form with current/new password inputs
- Shipping address form pre-populated from the last checkout
- All three panels live on a single settings page in a two-column layout on desktop, stacking on mobile

---

## UI/UX Design

**Typography.** Integral CF (Bold, DemiBold) handles all display text in headings, wordmark, and section titles in uppercase. Satoshi (Light through Bold) handles everything else.

**Component tiers.** `ui/` holds primitives (Button, Input, Slider, Sheet, Dialog, Checkbox), `atomic/` holds stateless composites (Rating, ColorSwatch, SizePill, OrderTrackingBar, QuantityStepper), and `section/`/`subsection/` hold page-level layout blocks. Each tier is independently replaceable.

**Responsive behavior.** The hero switches from a stacked column on mobile to a side-by-side row on desktop, where the main image is handled as a CSS background. The filter sidebar becomes a bottom sheet on mobile via shadcn's Sheet component. The navbar search listens on `visualViewport.resize`, not just `window.resize`, so it responds correctly to browser zoom.

---

## Technical Stack

| Layer      |                                  |
| ---------- | -------------------------------- |
| Framework  | React 19 + TypeScript            |
| Build      | Vite 8                           |
| Styling    | Tailwind CSS v4 + tw-animate-css |
| Components | shadcn/ui (base-nova) + Base UI  |
| State      | Zustand 5 (`persist` middleware) |
| Forms      | React Hook Form 7 + Zod 4        |
| Routing    | React Router 7                   |
| Icons      | Lucide React + Simple Icons      |

---

## Performance

**Fonts.** Self-hosted `.woff2` files load via `@font-face` declarations in `fonts.css`, which is imported at the top of `global.css` before any component CSS. No external font CDN request, no layout shift from late-loading typefaces.

**State persistence.** Zustand's `createJSONStorage(() => localStorage)` serializes cart, wishlist, and order history to localStorage. Reads are synchronous on hydration, so there is no loading state for persistent data on page refresh.

---

## Scalability

The application is structured so the static data layer in `src/constants/` is the only coupling point between components and data. Every product, order, user, and category object lives in typed constant files that export arrays and lookup maps. Replacing these constants with `fetch` calls or a React Query layer requires no changes to any component: the shape contracts are already defined as TypeScript interfaces.

---

## Compatibility

Targets modern evergreen browsers. `visualViewport`, `oklch`, and all other APIs used have full support across current Chrome, Firefox, Edge, and Safari. No polyfills included.

---

## Getting Started

```bash
pnpm install
pnpm dev        # development server
pnpm typecheck  # TypeScript check without emit
pnpm build      # production build
```

---

## Credits

Design by **Hamza Naeem**: [Figma Community Profile](https://www.figma.com/files/team/1257686825828261983/resources/community/@hamzauix) · [Original File](https://www.figma.com/community/file/1273571982885059508/e-commerce-website-template-freebie)

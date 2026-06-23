# MixCore — B2B Industrial Mixer Website

A clean, corporate, CRO-optimized site with an interactive machine configurator. Palette: dark slate `#0F172A`, industrial teal `#14B8A6` / blue `#0EA5E9`, white, with subtle steel grays. Frontend-only (no backend) — quote submissions show a success state and log to console; we can wire to Lovable Cloud later if you want persistence + email.

## Pages & Routes

```
/                    Home (hero, benefits, tech teaser, CTA to configurator)
/technology          Product/Technology page (how it works, specs, industries)
/configurator        Interactive configurator + quote form
```

Shared layout (in `__root.tsx`): sticky top nav with logo + links + "Get Quote" CTA, professional footer with company info, quick links, contact, legal.

## Home Page

- Hero: bold headline about the patented mixing tech, sub-copy, primary CTA "Configure Your Mixer", secondary "See the Technology". Right side: stylized machine illustration/photo.
- Key benefits strip: 4 cards with Lucide icons (Gauge=efficiency, Target=precision, ShieldCheck=certified, Cpu=smart control).
- "How it works" 3-step teaser linking to /technology.
- Brief About Us block (mission, patent #, years in industry, stats: units deployed, countries, industries).
- Trusted-by logo row (placeholder marks).
- Final CTA band → /configurator.

## Technology Page

- Patent overview with diagram (SVG illustration of the mixing process).
- "How the process works" — 4-5 step explainer with icons.
- Technical specifications table (throughput, viscosity range, power, materials, certifications).
- Industries / use cases grid: Pharma, Food & Beverage, Chemicals, Cosmetics, Petrochemical, Construction materials.
- CTA → /configurator.

## Configurator (core)

Single-page dashboard layout, 2-column on desktop, stacked on mobile:

```text
+--------------------------------------+----------------------+
| Step 1: Choose Model (11 cards grid) | Sticky Summary       |
|   - image, title, blurb, base price  |  Model: Beta         |
|   - selected card highlighted        |  Base: € 48,000      |
|                                      |  + Sensors  € 2,500  |
| Step 2: Optional Add-ons             |  + Warranty € 1,200  |
|   - 8 toggle rows w/ price delta     |  ────────────────    |
|   - smooth transition on toggle      |  Total:  € 51,700    |
|                                      |  [Request Quote]     |
+--------------------------------------+----------------------+
```

- Model grid: 11 cards (Alpha → Mu). Click to select. Selection animates (ring, scale, check).
- Add-ons: switches with label, short description, +€ delta. Toggling animates the summary total counting up/down.
- Sticky summary panel (desktop right column, bottom sheet on mobile) always visible.
- "Request Official Quote" opens a modal form: Name, Company, Email, Phone, Notes. Zod validation. On submit → success screen showing the full configuration summary + reference ID, plus "Configure another" button.

### Mock data (11 models)

Alpha (€32,000), Beta (€48,000), Gamma (€55,000), Delta (€61,000), Epsilon (€72,500), Zeta (€84,000), Eta (€96,000), Theta (€110,000), Iota (€128,000), Kappa (€152,000), Mu (€185,000) — each with short blurb (capacity, target industry) and placeholder image.

### Mock optionals (8)

Advanced Sensors +€2,500 · Extended Warranty +€1,200 · High-Capacity Tank +€4,000 · Explosion-Proof Cert +€5,500 · Remote Monitoring (IoT) +€3,200 · Stainless Steel Upgrade +€6,800 · Automated CIP Cleaning +€4,500 · On-site Installation & Training +€3,900.

## Design system

- Tailwind v4 tokens added to `src/styles.css`: `--background` (white), `--foreground` (slate-900), `--primary` (teal-500), `--accent` (sky-500), `--muted`, plus dark slate surface tokens for hero/footer sections. All component colors use semantic tokens — no hard-coded hex in JSX.
- Typography: Inter via `<link>` in `__root.tsx` head, tight headings, generous body line-height.
- Components: reuse shadcn `button`, `card`, `switch`, `input`, `textarea`, `label`, `dialog`, `badge`, `separator`.
- Motion: Tailwind transitions on hover/select; animated number counter for the live total (simple `requestAnimationFrame` tween hook).
- Lucide icons throughout.
- Fully responsive, desktop-first layout (max-w-7xl containers).

## Technical details

- New route files: `src/routes/index.tsx` (replace placeholder), `src/routes/technology.tsx`, `src/routes/configurator.tsx`.
- Shared UI: `src/components/site/Header.tsx`, `Footer.tsx`, `CtaBand.tsx`, plus configurator pieces in `src/components/configurator/` (`ModelGrid.tsx`, `OptionalsList.tsx`, `SummaryPanel.tsx`, `QuoteDialog.tsx`, `useConfigurator.ts` hook with `{ modelId, optionalIds[], total }` state).
- Mock data in `src/data/models.ts` and `src/data/optionals.ts` (typed).
- Quote form validated with Zod; on submit shows success state (no network call). Easy to swap later for a Cloud server function.
- `__root.tsx`: add Inter `<link>` in head, render `<Header />` and `<Footer />` around `<Outlet />`.
- Per-route `head()` metadata (unique title, description, og tags) for SEO.

## Out of scope (call out if you want them next)

- Persisting quote submissions / sending email (needs Lovable Cloud).
- Real product photography (using generated placeholder imagery / SVG illustration).
- i18n (Italian/English toggle) — currently English with "Preventivo" reference kept in CTA labels if you'd like.

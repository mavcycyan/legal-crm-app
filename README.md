# Legal CRM

Internal CRM for a law firm: clients and their cases, subscription (retainer) clients, advocates' case files, fees and payments, attached documents, archive and monthly billing reports. Role-based access for directors, lawyers and advocates.

> **Note:** this repository is an anonymized duplicate of a real project I built for a law firm (September 2024 – May 2025).
> The company name, branding, people's names, addresses and API URLs have been replaced with fictional ones. The commit history is preserved.
> The backend (REST API) is a separate project and is not included here.

<!-- Screenshots: add 2–3 images to docs/screenshots/ and reference them here -->

## Features

### Roles and access
- Four roles: super admin, director, lawyer, advocate
- Route-level access control: each role sees only its own sections; unauthorized routes redirect to the role's home section
- Token-based authentication; the token is attached to every request by an HTTP interceptor, and an expired session redirects to the login page
- User management: create users, assign roles, reset passwords

### Lawyers
- **Clients:** list with search, filters, sorting and server-side pagination; client card with all related works
- **Client works:** status, start and end dates, "what was done" log, result, fees and payments, attached files
- **Subscription clients:** contract dates, monthly fee, list of works per subscriber
- Assigning cases to advocates

### Advocates
- Cases grouped by categories, case card with clients and works
- Works within a case: progress log, fees with payment deadlines, payments, files
- Own client list

### Finance and reports
- Fees and payments for client works, subscriber works and advocate cases, in UAH, USD and EUR
- Payment history in a modal from any table row
- Monthly report table for subscription clients: fee, payments, debt, with inline editing of the current month

### Archive
- Separate archive views for clients, subscribers and advocate cases

## Tech stack
- Angular 15, TypeScript, RxJS 7
- Angular Router with guards, HTTP interceptor
- Reactive forms
- SCSS
- REST API (separate backend)

## Architecture highlights
- **Reusable UI components** in `components/global`: table, pagination, filter, search form, info cards and modals. The same table component is used on 13 screens, pagination on 13, the filter on 7.
- **Config-driven forms:** one edit-form component renders any entity form from a field configuration (`text`, `date`, `number`, `select`, multi-select, status, `textarea`, files, payments, and more). Adding a new entity form means describing its fields, not writing a new template.
- **Feature folders** for layouts (lawyer, advocate, users, archive, calculations, edit pages), a separate `services` layer per domain, typed models in `models`, custom pipes for roles, statuses and currencies.
- **Dependent requests** are composed with `switchMap` (for example, loading advocates, categories and clients before rendering the case form).
- **Pagination state in the URL** (`/clients/page/:page`), so a page can be shared or reloaded.

## Running locally

Requirements: Node.js 16 or 18 (Angular 15), npm.

```bash
npm ci
npm start          # http://localhost:4200
```

Set the API address in `src/globals/globals.ts` (`api_url`). Without a running backend the app will show only the login page.

Other commands:
```bash
npm run build      # production build to dist/
npm test           # unit tests (Karma + Jasmine)
```

## What I would improve next
- Replace remaining `any` types in shared components with proper interfaces and generics
- A notification service instead of `alert()` and a single place for error handling
- `OnPush` change detection and `takeUntilDestroyed` / `async` pipe instead of manual unsubscribes
- Unit tests for services and the permission logic
- Environment-based configuration instead of `globals.ts`
- Upgrade to a current Angular version (standalone components, signals)

The backend (Laravel REST API, also built by me) is a separate project

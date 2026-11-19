# BV Creator Hub Backend, Data, and Integration Brief

## 1. Purpose

This document is the technical handoff for the vendor-facing BV Creator Hub application currently deployed at `https://bvcreatorhub.web.app` and powered by the `/merch/*` routes in this repository.

It is written for the developers who will turn the current frontend prototype into a production system backed by a real database, authentication layer, APIs, storage, payment integrations, shipping integrations, and reporting pipelines.

This brief is intentionally vendor-facing in scope.

- The app is a workspace for vendors to run their own store.
- It is not an internal Blacvolta operations dashboard.
- It should not expose other vendors' private data, platform-wide controls, or back-office review tools.
- Any internal review, payout intervention, compliance approval, or merchandising control that Blacvolta staff need should live in a separate protected internal surface or behind internal-only endpoints.

The legacy ticketing product in this repo remains a separate surface and should not shape the first backend for BV Creator Hub.

## 2. Product Definition

BV Creator Hub is the vendor console for brands, creators, and merchants selling through the Blacvolta app and web commerce channels.

From the vendor's point of view, the product needs to support five core jobs:

- set up and verify a store
- manage storefront profile, products, collections, and campaigns
- process orders, shipping, returns, and customer support
- receive payments and monitor payouts
- understand performance through analytics, content commerce, and account health

The frontend already reflects that direction. The backend should follow the same model.

Two route names in the current prototype need special handling:

- `/merch/merchants` is now the Storefront Profile and Brand Setup workspace, not a merchant list
- `/merch/risk` is now Account Health and Compliance, not an internal fraud or risk operations queue

The route names can stay as they are for frontend compatibility, but backend naming should reflect the actual product meaning.

## 3. Implementation Guardrails

Before any schema or endpoint work starts, the team should align on the rules below.

### 3.1 What the vendor should see

- only their own store, catalog, orders, payouts, customers, and content placements
- plain-language verification and compliance statuses
- actionable alerts such as "update payout account" or "upload a missing tax document"
- performance data derived from their own sales and traffic

### 3.2 What the vendor should not see

- other vendors' metrics, payouts, approval states, or support issues
- internal review notes written by Blacvolta staff
- platform-wide fee configuration or settlement rules for other merchants
- raw fraud scores, detection rules, or internal moderation logic
- back-office actions that belong to internal staff only

### 3.3 What still has to exist behind the scenes

Even though the app is vendor-facing, the platform still needs internal workflows for:

- onboarding review and verification decisions
- payout holds and release decisions
- refund disputes and chargeback handling
- merchandising and featured placement management
- compliance interventions and account suspensions

Those are backend responsibilities and internal tooling responsibilities. They are not vendor UI responsibilities.

## 4. Current Frontend State

The current app is a React/Vite prototype with realistic navigation and workflows but no backend integration yet.

### 4.1 Stack and app behavior

- React 19
- TypeScript
- Vite
- React Router 7
- local component state for most page data
- no backend SDK in use
- no data-fetching layer
- no schema validation on API boundaries
- no persistent auth/session layer
- no route guards

### 4.2 Current mock behavior

- `src/pages/MerchGetStartedPage.tsx`
  - signup and login validate locally only
  - remember-me is local browser behavior only
  - terms, privacy, and password help are local modals only
- `src/pages/MerchOnboardingPage.tsx`
  - onboarding data is stored in `sessionStorage` through `src/lib/merchSetup.ts`
  - uploaded logo is stored as a local preview
  - ID and selfie uploads only retain filenames today
  - final submission changes only the local success state
- merch dashboard pages
  - metrics, charts, statuses, queues, and CSV exports are hard-coded inside page files
- topbar notifications and signed-in vendor identity
  - currently mocked in the frontend

### 4.3 Live vendor routes

- `/merch/get-started`
- `/merch/setup/account`
- `/merch/setup/verification`
- `/merch/setup/payout`
- `/merch/setup/review`
- `/merch/analytics`
- `/merch/merchants`
- `/merch/products`
- `/merch/orders`
- `/merch/inventory`
- `/merch/collections`
- `/merch/promotions`
- `/merch/customers`
- `/merch/payments`
- `/merch/logistics`
- `/merch/risk`
- `/merch/content-commerce`
- `/merch/settings`

## 5. What the Backend Must Deliver

Connecting a database alone will not make this product functional. The system needs the full platform around the database.

At minimum, the production implementation must deliver:

- secure registration, login, sessions, password reset, and role-aware access
- persistent onboarding drafts across devices and sessions
- object storage for logos, banners, product media, documents, and campaign assets
- vendor-scoped APIs for every dashboard route
- payment capture, reconciliation, ledgering, and payouts
- shipping rules, carrier integrations, tracking, and shipment updates
- customer, order, return, and refund workflows
- notifications and export jobs
- analytics aggregation
- audit logs and internal event history

## 6. Recommended Technical Shape

The simplest safe implementation is a modular monolith with clear domain boundaries and a shared relational database. That gives the team enough structure to scale later without forcing premature microservices.

### 6.1 Core runtime components

- API application
  - REST is enough for the first version
- PostgreSQL
  - primary transactional database
- object storage
  - S3-compatible bucket, Firebase Storage, or equivalent
- background job runner
  - notifications, exports, payout jobs, webhook retries, analytics snapshots
- webhook receiver
  - payments and shipping provider callbacks
- email and SMS delivery provider
- monitoring, logging, and alerting

### 6.2 Tenancy model

The backend should be tenant-aware from day one.

Recommended model:

- `organizations`
  - legal or business tenant
- `stores`
  - the storefront managed inside BV Creator Hub
- `users`
  - human accounts
- `organization_members`
  - membership and role assignment

This leaves room for one organization to run one or more stores later without rewriting the model.

### 6.3 Internal operations surface

The backend must support internal staff actions, but those actions should not be designed as vendor-facing screens in this app.

Recommended approach:

- internal admin APIs protected by service roles and staff permissions
- separate internal web surface, or
- a future admin repo using the same backend

## 7. Recommended Domain Model

The table names below are suggestions, not hard requirements. The important part is the domain separation and the ownership boundaries.

### 7.1 Identity and access

- `users`
  - account identity
- `sessions`
  - browser or device sessions
- `password_reset_tokens`
  - reset flow
- `organizations`
  - legal tenant
- `stores`
  - storefront record linked to organization
- `organization_members`
  - user membership inside organization
- `roles`
  - role definitions
- `permissions`
  - atomic permission keys
- `role_permissions`
  - role-to-permission mapping
- `member_invitations`
  - team invitations
- `auth_audit_log`
  - login, logout, lockout, invite acceptance, reset activity

### 7.2 Onboarding, verification, and compliance

- `store_onboarding_applications`
  - current and historical onboarding submissions
- `verification_documents`
  - uploaded ID, selfie, registration, tax, or supporting documents
- `verification_checks`
  - automated and manual verification outcomes
- `store_status_history`
  - draft, submitted, changes requested, verified, restricted, suspended
- `tax_profiles`
  - TIN and related tax metadata
- `payout_accounts`
  - bank or mobile money destinations
- `payout_preferences`
  - settlement preference and payout timing
- `compliance_acceptances`
  - agreement acceptance records
- `internal_review_actions`
  - protected staff review history

### 7.3 Storefront and brand profile

- `store_profiles`
  - public-facing store metadata
- `store_contacts`
  - support email, phone, and contact points
- `store_social_links`
  - Instagram, TikTok, website, and related links
- `store_assets`
  - logo, banners, hero imagery, brand assets
- `store_readiness_checks`
  - derived readiness states used by the dashboard
- `featured_surface_assignments`
  - read-only to vendor unless there is an explicit acceptance flow

### 7.4 Catalog, pricing, and inventory

- `categories`
  - product taxonomy
- `products`
  - product metadata
- `product_variants`
  - size, color, SKU, barcode, and variant dimensions
- `product_prices`
  - price, currency, discount windows
- `product_media`
  - images and video attachments
- `product_status_history`
  - draft, live, archived, requires changes
- `collections`
  - collection or drop container
- `collection_products`
  - assignment of products to collections
- `inventory_levels`
  - current sellable stock by SKU
- `inventory_adjustments`
  - restocks, corrections, returns, shrinkage
- `inventory_reservations`
  - temporary checkout holds before payment confirmation
- `stock_alert_rules`
  - vendor thresholds and alert settings

### 7.5 Orders, fulfillment, and returns

- `customers`
  - buyer identity
- `customer_addresses`
  - shipping and billing addresses
- `orders`
  - order header
- `order_items`
  - purchased items
- `order_status_events`
  - timeline of state changes
- `shipments`
  - fulfillment records
- `shipment_items`
  - item-to-shipment mapping
- `tracking_events`
  - carrier timeline updates
- `returns`
  - return or exchange requests
- `refunds`
  - refund records
- `support_cases`
  - customer or order support threads

### 7.6 Payments, fees, ledger, and payouts

- `payment_intents`
  - payment attempt records
- `payment_transactions`
  - authorizations, captures, failures, reversals
- `payment_provider_events`
  - raw webhook events and processing status
- `fee_rules`
  - platform and processing fee configuration
- `ledger_entries`
  - double-entry or equivalent internal ledger movements
- `settlement_cycles`
  - windows used to group cleared revenue
- `settlement_items`
  - per-store amount calculations within a cycle
- `payouts`
  - transfer attempts and outcomes
- `payout_failures`
  - failed transfer diagnostics and retry handling
- `disputes`
  - chargebacks and disputes

### 7.7 Shipping and carrier configuration

- `carriers`
  - available shipping partners
- `carrier_accounts`
  - linked credentials or references to secured secrets
- `shipping_zones`
  - geography definitions
- `shipping_rules`
  - fixed, tiered, or API-based shipping logic
- `shipping_quotes`
  - quotes returned during checkout
- `delivery_promises`
  - ETA rules shown to customers
- `shipment_exceptions`
  - delays, failed deliveries, and investigations

### 7.8 Customers and CRM

- `customer_tags`
  - VIP, repeat buyer, support-sensitive, manual watch flags
- `customer_notes`
  - internal vendor notes
- `customer_segments`
  - dynamic or static segments
- `customer_segment_memberships`
  - customer-to-segment mapping
- `communication_preferences`
  - consent and channel preferences
- `campaign_recipients`
  - customers reached by specific campaigns

### 7.9 Promotions, collections, and content commerce

- `campaigns`
  - promotions and launch campaigns
- `campaign_rules`
  - eligibility, threshold, and timing logic
- `promo_codes`
  - redeemable codes
- `campaign_assets`
  - banners and creative
- `content_surfaces`
  - editorial, creator, event, landing page, podcast, story surfaces
- `content_placements`
  - placement records
- `content_product_links`
  - products linked into a content placement
- `creator_links`
  - shareable links or creator-specific traffic destinations
- `attribution_events`
  - traffic and conversion attribution

### 7.10 Notifications, exports, and analytics

- `notifications`
  - in-app activity feed
- `notification_deliveries`
  - email, SMS, push delivery attempts
- `metric_snapshots`
  - cached KPI time series
- `report_exports`
  - server-side export jobs and generated files
- `audit_logs`
  - immutable cross-domain history

## 8. Current Route-by-Route Backend Requirements

This section maps the live UI to backend behavior.

### 8.1 `/merch/get-started`

This route needs real authentication.

Vendor-visible responsibilities:

- sign up
- log in
- remember email on this device
- open password recovery flow

Backend responsibilities:

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/session`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`

Expected behavior:

- create the first user for the organization
- create the organization and draft store record
- create or resume the onboarding application
- prevent duplicate email registration
- rate-limit repeated login attempts
- audit login and reset activity

### 8.2 `/merch/setup/account`, `/verification`, `/payout`, `/review`

This flow should move from browser session state into persistent onboarding records.

Backend responsibilities:

- `GET /onboarding/current`
- `PATCH /onboarding/current`
- `POST /onboarding/current/uploads`
- `POST /onboarding/current/submit`
- `GET /onboarding/current/status`

What must be stored:

- brand name
- contact person
- email
- phone
- business type
- social links
- logo and brand assets
- business registration data
- tax details
- payout destination and settlement preference
- seller agreement acceptance

Important implementation note:

The vendor app should show clear statuses such as:

- draft
- submitted
- more information required
- verified

It should not display internal reviewer notes verbatim unless product explicitly decides to expose them.

### 8.3 `/merch/analytics`

This is the vendor's own performance overview.

It needs:

- sales summary
- units sold
- conversion rate
- returning customer rate
- sales and order trend
- traffic sources
- top products
- export support

Backend responsibilities:

- `GET /dashboard/summary`
- `GET /dashboard/sales-trend`
- `GET /dashboard/traffic-sources`
- `GET /dashboard/top-products`
- `POST /exports/analytics`

Source data:

- orders
- order items
- cleared payment records
- attribution events
- customer repeat-purchase calculations

### 8.4 `/merch/merchants` as Storefront Profile

Treat this route as the vendor's storefront profile workspace.

It needs:

- brand story
- social links
- support contact details
- logo and campaign asset management
- payout readiness and profile completeness signals
- read-only visibility into featured placements or storefront surfaces

Backend responsibilities:

- `GET /storefront`
- `PATCH /storefront`
- `POST /storefront/assets`
- `DELETE /storefront/assets/:assetId`
- `PATCH /storefront/social-links`
- `PATCH /storefront/contacts`
- `GET /storefront/readiness`
- `GET /storefront/placements`

Do not build this as a cross-vendor merchant management endpoint for the vendor UI.

### 8.5 `/merch/products`

This route needs a full catalog management API.

It needs:

- product list
- product detail
- create, edit, archive, publish, and unpublish
- price and sale windows
- media uploads
- collection assignment
- variant and SKU management
- stock visibility
- bulk export

Backend responsibilities:

- `GET /products`
- `GET /products/:productId`
- `POST /products`
- `PATCH /products/:productId`
- `DELETE /products/:productId`
- `POST /products/:productId/media`
- `POST /products/:productId/variants`
- `PATCH /products/:productId/status`
- `POST /exports/products`

Important note:

If internal review exists, the vendor-facing status should read like a publishing workflow, for example `requires changes`, not like an internal moderation queue.

### 8.6 `/merch/orders`

This route needs real order operations.

It needs:

- search and filter by order, customer, status, date, fulfillment state
- order detail view
- packing and shipment state transitions
- return and refund handling
- links into customer support context

Backend responsibilities:

- `GET /orders`
- `GET /orders/:orderId`
- `PATCH /orders/:orderId/status`
- `POST /orders/:orderId/shipments`
- `GET /orders/:orderId/shipments`
- `POST /orders/:orderId/returns`
- `POST /orders/:orderId/refunds`
- `POST /exports/orders`

This route should eventually move away from generic table actions and into proper order detail endpoints.

### 8.7 `/merch/inventory`

This route needs inventory integrity, not just a stock list.

It needs:

- current stock by SKU
- low-stock and out-of-stock thresholds
- adjustment history
- reservation-aware availability
- alerts tied to campaigns and launches

Backend responsibilities:

- `GET /inventory`
- `GET /inventory/:sku/history`
- `POST /inventory/adjustments`
- `PATCH /inventory/alerts`
- `GET /inventory/alerts`
- `POST /exports/inventory`

The stock model must be consistent with checkout reservations and payment confirmation or the analytics and order surfaces will drift.

### 8.8 `/merch/collections`

This route needs collection and launch management.

It needs:

- collection CRUD
- product assignment
- launch windows and countdowns
- featured flags
- export

Backend responsibilities:

- `GET /collections`
- `GET /collections/:collectionId`
- `POST /collections`
- `PATCH /collections/:collectionId`
- `POST /collections/:collectionId/products`
- `DELETE /collections/:collectionId/products/:productId`
- `PATCH /collections/:collectionId/launch-window`
- `POST /exports/collections`

### 8.9 `/merch/promotions`

This route needs real campaign and discount logic.

It needs:

- promotions list
- campaign status
- discount logic
- promo code support
- free shipping and timed sale rules
- campaign exports

Backend responsibilities:

- `GET /campaigns`
- `GET /campaigns/:campaignId`
- `POST /campaigns`
- `PATCH /campaigns/:campaignId`
- `POST /campaigns/:campaignId/rules`
- `POST /campaigns/:campaignId/codes`
- `PATCH /campaigns/:campaignId/status`
- `POST /exports/campaigns`

### 8.10 `/merch/customers`

This route needs vendor-safe CRM features.

It needs:

- customer list
- lifetime value
- repeat-purchase signals
- support flags
- notes
- segments or tags
- location insights
- export

Backend responsibilities:

- `GET /customers`
- `GET /customers/:customerId`
- `POST /customers/:customerId/notes`
- `POST /customers/:customerId/tags`
- `GET /customers/segments`
- `POST /exports/customers`

Any communication feature tied to this route should respect consent, suppression, and local compliance requirements.

### 8.11 `/merch/payments`

This route needs a proper financial read model backed by a ledger.

It needs:

- gross sales
- net payouts
- fees deducted
- pending settlement
- settlement windows
- payout history
- transaction reconciliation

Backend responsibilities:

- `GET /finance/summary`
- `GET /finance/settlements`
- `GET /finance/payouts`
- `GET /finance/transactions`
- `POST /exports/finance`

Required backend behavior:

- reconcile provider webhooks
- compute net amounts after fees
- group settled revenue into payout cycles
- track payout success, failure, and retry states

### 8.12 `/merch/logistics`

This route needs vendor-facing shipping configuration and shipment visibility.

It needs:

- connected carriers
- shipping rules
- zone logic
- service levels
- shipment health
- tracking visibility

Backend responsibilities:

- `GET /shipping/carriers`
- `GET /shipping/rules`
- `POST /shipping/rules`
- `PATCH /shipping/rules/:ruleId`
- `GET /shipping/shipments`
- `GET /shipping/shipments/:shipmentId/tracking`
- `POST /exports/shipping`

Carrier credentials should never be exposed to the browser. Store only references to secured credentials or use a vault-backed connection model.

### 8.13 `/merch/risk` as Account Health

This route should be implemented as vendor-facing account health, not internal fraud operations.

It needs:

- verification tasks
- payout readiness issues
- catalog issues
- shipping exceptions
- policy alerts
- clear next actions for the vendor

Backend responsibilities:

- `GET /account-health/summary`
- `GET /account-health/tasks`
- `GET /account-health/issues`
- `POST /account-health/issues/:issueId/acknowledge`

Important rule:

This surface should expose vendor-actionable states, not raw internal scoring or detection logic.

Good vendor-facing examples:

- missing tax information
- payout account requires update
- listing needs care instructions
- recent return rate needs attention

Bad vendor-facing examples:

- hidden fraud score
- internal decision notes
- rule engine outputs that have no vendor action attached

### 8.14 `/merch/content-commerce`

This route needs content-linked commerce records.

It needs:

- placements list
- linked products
- surface type
- placement status
- attribution reporting
- export support

Backend responsibilities:

- `GET /content/placements`
- `GET /content/placements/:placementId`
- `POST /content/placements`
- `PATCH /content/placements/:placementId`
- `POST /content/placements/:placementId/products`
- `GET /content/attribution`
- `POST /exports/content-commerce`

### 8.15 `/merch/settings`

This route needs real team, access, payout, and shipping configuration APIs.

It needs:

- team members
- invitations
- role assignments
- payout connections
- shipping connections
- permission-aware actions

Backend responsibilities:

- `GET /settings/team`
- `POST /settings/invitations`
- `PATCH /settings/members/:memberId/role`
- `DELETE /settings/members/:memberId`
- `GET /settings/payout-accounts`
- `POST /settings/payout-accounts`
- `GET /settings/shipping-connections`
- `POST /settings/shipping-connections`

This route is also where RBAC becomes enforceable across the rest of the app.

## 9. Recommended API Conventions

The team should align on a few API rules early to avoid churn.

- version APIs from the start
- use stable IDs, not display names, as foreign keys
- return organization and store context in session/bootstrap payloads
- use cursor or page-based pagination consistently
- support filtering and sorting in list endpoints
- return structured validation errors for forms
- use idempotency keys on payment and payout actions
- verify webhook signatures
- make exports asynchronous once datasets grow
- include audit metadata on write actions

Recommended bootstrap call after login:

- `GET /app/bootstrap`

That response can include:

- authenticated user
- organization
- store
- role and permissions
- onboarding state
- notification count
- top-level account health summary

## 10. Integration Requirements

### 10.1 Authentication and account security

- password hashing
- secure sessions or signed tokens with refresh strategy
- password reset email flow
- login audit logging
- optional MFA later
- session revocation

### 10.2 Payments

Paystack is the obvious first payment integration based on the current product assumptions.

The payment implementation needs:

- payment initiation
- webhook confirmation
- reconciliation
- refund support
- dispute handling
- payout initiation or payout export workflow depending on provider model

### 10.3 Shipping

The shipping layer needs:

- rate quote support
- service-level and zone configuration
- label or shipment creation if providers support it
- tracking update ingestion
- shipment exception handling

### 10.4 Storage and CDN

Store these outside the database:

- logos
- banners
- product images
- product videos
- onboarding documents
- campaign assets

Requirements:

- signed upload flow
- mime-type validation
- file size limits
- image optimization where needed
- signed download URLs for protected files

### 10.5 Messaging

The platform should support:

- email notifications
- optional SMS for order or payout alerts
- queue-backed delivery and retry
- per-channel audit trail

## 11. Security, Audit, and Compliance

The first production version should treat the areas below as non-negotiable.

- RBAC on every write endpoint
- strict tenant scoping on every read and write
- server-side validation of ownership and store access
- audit logs for onboarding submission, payout changes, refunds, role changes, and compliance actions
- encryption for sensitive fields and secrets
- signed webhook verification
- rate limiting for auth and public-facing write endpoints
- backups and restore procedures
- operational logging and error tracking

## 12. Frontend Integration Work Still Required

Once the backend exists, the frontend still needs a structured integration pass.

- replace static arrays with API data
- replace `sessionStorage` onboarding persistence with backend draft persistence
- add loading, empty, and error states to merch routes
- add auth bootstrap and session expiry handling
- add route protection for authenticated vendor areas
- replace local CSV generation with server-backed exports where needed
- replace placeholder modals with real workflows where applicable
- add detail views for orders, customers, products, payouts, and placements

## 13. Delivery Plan

The safest build sequence is below.

### Phase 1: foundation

- PostgreSQL schema and migrations
- auth and session model
- organization and store tenancy
- storage integration
- background jobs
- audit log base layer

### Phase 2: onboarding and store profile

- registration and login
- onboarding draft persistence
- document uploads
- verification state machine
- payout account setup
- storefront profile and brand assets

### Phase 3: catalog, collections, and inventory

- product CRUD
- variant and media model
- collection management
- inventory levels, adjustments, and thresholds

### Phase 4: orders, payments, and payouts

- order model
- payment provider integration
- ledger and settlement calculations
- payouts and payout status tracking
- refunds and returns

### Phase 5: shipping, customers, campaigns, and content commerce

- carrier rules
- shipment tracking
- customer notes and segmentation
- campaigns and promo codes
- content placements and attribution

### Phase 6: analytics and account health

- KPI aggregation
- performance reporting
- notification feed
- vendor-facing account health tasks
- internal tools for review and intervention

## 14. Open Product Decisions the Team Should Resolve Early

These are not blockers for schema design, but the answers will change some endpoint behavior.

- Can one organization operate multiple stores, or should the first release assume one store per organization?
- Can vendors trigger refunds directly, or only request them?
- Are shipping accounts vendor-specific, platform-managed, or a mix of both?
- Should featured placements be vendor-readable only, or can vendors submit placement requests?
- Will customer messaging happen inside BV Creator Hub, or through an external CRM provider?
- Will content commerce placements be authored inside this dashboard, or linked from a separate CMS?

## 15. Final Engineering Checklist

Before calling the product production-ready, the team should be able to answer yes to the following.

### Platform readiness

- authentication works end to end
- every merch route is tenant-scoped
- permissions are enforced on the server
- audit logs exist for sensitive actions
- secrets are stored outside source control

### Vendor workflow readiness

- a new vendor can sign up, complete onboarding, upload documents, and resume later
- a verified vendor can edit store profile, add products, create collections, and manage stock
- a vendor can view real orders, shipments, returns, customers, payouts, and alerts
- analytics are generated from real data, not manual entries

### Financial and operational readiness

- payments reconcile correctly
- payouts are ledger-backed
- inventory stays in sync with checkout and refunds
- shipping updates flow back into orders
- exports work on real datasets

### Go-live readiness

- monitoring and alerting are active
- backup policy is documented
- webhook retry strategy is in place
- support and internal review tools exist for verification, payout issues, and interventions

## 16. Closing Recommendation

Build BV Creator Hub as a vendor-scoped commerce platform with a strong internal service layer behind it, not as a thin admin console tied directly to raw database tables.

If the backend is designed around vendor ownership, ledger-backed finance, inventory integrity, and protected internal operations, the current frontend can be turned into a reliable production product without a second architecture reset.

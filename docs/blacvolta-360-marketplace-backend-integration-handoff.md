# Blacvolta 360 Marketplace Backend & Database Integration Handoff

## 1. Scope

- This document covers the marketplace app currently served from `blacvolta-store.web.app`, which maps to the `/merch/*` routes in `src/router.tsx`.
- The repo still contains the older ticketing dashboard and related local-storage modules, but that is a separate product surface and should not drive the first database design for the marketplace deployment.
- This handoff is based on the current frontend implementation plus the marketplace epic. It is intended for the developers who will make the prototype production-ready.
- Important: connecting a database alone will not make this app functional. The app also needs authentication, APIs, object storage, background jobs, provider integrations, audit logging, and a real permissions model.

## 2. Executive Summary

- The current marketplace app is a frontend prototype built with React, Vite, and React Router.
- There is no backend client in the app today.
- There is no server-side authentication or authorization.
- There is no database schema or API contract implemented in the frontend.
- There is no live payment, logistics, notification, moderation, CRM, or analytics pipeline.
- Marketplace onboarding uses `sessionStorage` via `src/lib/merchSetup.ts`.
- Dashboard pages use hard-coded arrays embedded in the page files themselves.
- Exports use browser-generated CSVs from `src/lib/download.ts`.
- Notifications, profile identity, metrics, queues, rankings, statuses, and charts are static UI data right now.

To make the app fully functional, the team needs:

- A tenant-aware backend with organization-level scoping.
- A relational database, ideally PostgreSQL.
- Object storage for logos, merchant documents, product media, and campaign assets.
- Authentication, sessions, password reset, and role-based access control.
- APIs for every marketplace route.
- Webhook ingestion for payments and logistics updates.
- Background jobs for settlements, notifications, analytics aggregation, and monitoring.
- Audit logging for all governance, financial, and risk actions.

## 3. Current Frontend Audit

### 3.1 Framework and app shell

- Frontend stack: React 19, React Router 7, Vite, TypeScript.
- No data-fetching library is installed.
- No backend SDK is installed.
- No schema-validation library is installed.
- No global auth/session store exists.
- No route guards exist.
- No loading, retry, empty, unauthorized, or API error states exist for the merch routes.

### 3.2 Live marketplace routes

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

### 3.3 Current persistence and mock behavior

- `src/lib/merchSetup.ts`
  - Uses `sessionStorage`.
  - Stores onboarding fields, payout preferences, filenames, and logo preview data URL.
- `src/pages/MerchGetStartedPage.tsx`
  - Signup only validates fields locally.
  - Login only validates fields locally.
  - Demo account only writes seed values into onboarding session state.
- `src/pages/MerchOnboardingPage.tsx`
  - Stores uploaded logo preview in browser memory and session storage.
  - Stores only document filenames for ID and selfie uploads.
  - Submitting onboarding does not call an API.
  - Approval state is simulated in-component.
- `src/pages/*Page.tsx` across the merch dashboard
  - Metrics, tables, charts, pipelines, leaderboards, and statuses are static arrays declared inside each page file.
- `src/lib/download.ts`
  - Exports current page arrays to CSV entirely in the browser.
- `src/components/dashboard/Topbar.tsx`
  - Notifications are hard-coded.
  - Signed-in user identity is hard-coded.

### 3.4 Placeholder-only or non-functional controls

- Most page header actions are visual only and do not open real workflows yet.
- Merchant email actions use `mailto:` links instead of an internal CRM or support tool.
- Order row actions route to the customers page instead of an order detail page.
- Analytics rankings are static strings, not computed from transactions.
- Risk scoring is static text, not derived from signals.
- Settlement batches are static rows, not generated from ledger data.
- Logistics health and rates are static, not sourced from provider integrations.
- Content commerce placements are static, not linked to any content CMS or event system.
- Settings shows role cards, but there is no real RBAC enforcement in the app.

## 4. What The Backend Must Support

The epic describes six commerce services. Those are valid domain boundaries, but this app still needs a few platform layers around them. The safest implementation path is a modular monolith first, with clean domain boundaries and a shared PostgreSQL database, then split into services later only if scale or team structure demands it.

### 4.1 Epic-aligned business domains

- Merchant Service
- Product Service
- Order Service
- Payment Service
- Logistics Service
- CRM Service

### 4.2 Required platform layers

- Identity and Access
- File Storage
- Notifications
- Risk and Trust
- Analytics and Reporting
- Audit and Compliance

## 5. Recommended Core Architecture

### 5.1 Backend shape

- API application
  - REST is enough for this app.
  - GraphQL is optional, not required.
- Relational database
  - PostgreSQL recommended.
- Object storage
  - S3-compatible bucket, Firebase Storage, or equivalent.
- Background job processor
  - For payouts, notifications, metrics snapshots, document review, and webhook retries.
- Webhook intake service
  - For payment provider and logistics provider callbacks.
- Admin audit/event log
  - For approval actions, payout approvals, refunds, risk interventions, and role changes.

### 5.2 Tenancy model

- Every record should belong to a tenant.
- The tenant in this app is the merchant organization or internal Blacvolta admin organization.
- Users should never own marketplace data directly without organization scoping.
- Roles and permissions should be evaluated within an organization context.
- Platform admins need elevated cross-tenant visibility.

### 5.3 Environments and operational needs

- Development environment with seed data.
- Staging environment with sandbox payment and logistics credentials.
- Production environment with separate storage buckets, webhook URLs, and secrets.
- Secret management for payment keys, logistics keys, email credentials, and JWT/session secrets.
- Monitoring and error reporting.
- Migration system for schema changes.
- Backup and restore policy for production.

## 6. Recommended Database Domains And Tables

This is the minimum practical data model to support the current marketplace UI and the epic without painting the team into a corner.

### 6.1 Identity and access

- `users`
  - Basic account identity.
- `sessions`
  - Browser or device sessions.
- `password_reset_tokens`
  - Password recovery flow.
- `organizations`
  - Merchant tenants and internal Blacvolta admin tenants.
- `organization_members`
  - Users assigned to organizations.
- `roles`
  - System roles and tenant roles.
- `permissions`
  - Atomic permission keys.
- `role_permissions`
  - Many-to-many mapping.
- `member_invitations`
  - Invites for merchant admins and staff.
- `auth_audit_log`
  - Login, logout, password reset, invite acceptance, lockout.

### 6.2 Merchant governance and onboarding

- `merchant_applications`
  - Draft and submitted onboarding records.
- `merchant_profiles`
  - Approved merchant/storefront business profile.
- `merchant_status_history`
  - Submitted, in review, approved, rejected, suspended.
- `merchant_categories`
  - Discovery and reporting segmentation.
- `merchant_review_notes`
  - Admin review comments.
- `merchant_documents`
  - ID, selfie, tax documents, registration docs.
- `merchant_payout_accounts`
  - Bank accounts and mobile money destinations.
- `merchant_settlement_preferences`
  - Weekly, twice monthly, custom, etc.
- `merchant_commission_rules`
  - Merchant-specific overrides when needed.
- `storefronts`
  - Public-facing merchant storefront metadata.

### 6.3 Files and assets

- `assets`
  - Uploaded file metadata.
- `asset_variants`
  - Thumbnails, resized images, alternate formats.
- `asset_links`
  - Polymorphic link table between assets and merchants, products, collections, campaigns, and content placements.

### 6.4 Catalog and inventory

- `categories`
  - Product taxonomy.
- `products`
  - Product-level metadata.
- `product_variants`
  - SKU-level size and color variants.
- `product_media`
  - Images and videos.
- `product_prices`
  - Base price, sale price, currency, validity windows.
- `product_inventory`
  - Current sellable quantity per SKU.
- `inventory_adjustments`
  - Manual adjustments, restocks, corrections, returns.
- `inventory_reservations`
  - Held stock during checkout or payment authorization.
- `product_status_history`
  - Draft, pending review, approved, rejected, archived.
- `product_moderation_cases`
  - Restricted keyword flags and moderation decisions.
- `restricted_terms`
  - Platform-level moderation rules.

### 6.5 Collections, drops, and merchandising

- `collections`
  - Named drops or grouped merch programs.
- `collection_products`
  - Product assignments to collections.
- `collection_launch_windows`
  - Start time, end time, countdown behavior, waitlist windows.
- `homepage_placements`
  - Featured brand and collection placements.
- `merchandising_rules`
  - Ranking and spotlight rules for the marketplace.

### 6.6 Customers and CRM

- `customers`
  - Marketplace customer identity.
- `customer_addresses`
  - Shipping and billing addresses.
- `customer_profiles`
  - Optional extended metadata for segmentation.
- `customer_segments`
  - VIP, repeat buyer, fraud watch, etc.
- `customer_segment_memberships`
  - Customer-to-segment assignments.
- `customer_notes`
  - Support notes and internal comments.
- `customer_communication_preferences`
  - Email, SMS, push opt-ins.
- `customer_blacklist_entries`
  - Fraud or abuse controls.

### 6.7 Orders and fulfillment

- `orders`
  - Order header.
- `order_items`
  - Purchased SKUs.
- `order_status_history`
  - Pending, paid, processing, shipped, delivered, returned, refunded, cancelled.
- `order_addresses`
  - Snapshot of checkout addresses.
- `shipments`
  - One or more shipments per order.
- `shipment_items`
  - Item-to-shipment mapping.
- `tracking_events`
  - Carrier events and timeline.
- `returns`
  - Return and exchange records.
- `refunds`
  - Refund records tied to payment transactions.
- `support_cases`
  - Order-linked or customer-linked support issues.

### 6.8 Payments, fees, and settlements

- `payment_transactions`
  - Authorizations, captures, failures, reversals.
- `payment_provider_events`
  - Raw webhook payloads and processing status.
- `fee_rules`
  - Platform convenience fees.
- `commission_rules`
  - Marketplace commission configuration by merchant, category, or campaign.
- `ledger_entries`
  - Internal accounting movements.
- `settlement_batches`
  - Grouped merchant payouts.
- `settlement_batch_items`
  - Per-merchant settlement lines.
- `payouts`
  - Actual transfer attempts and results.
- `disputes`
  - Chargebacks and payment disputes.
- `refund_reasons`
  - Structured refund reason taxonomy.

### 6.9 Logistics

- `logistics_providers`
  - DHL, FedEx, local providers, status, capabilities.
- `provider_credentials`
  - Encrypted API credentials or references to vault secrets.
- `shipping_zones`
  - Geography definitions.
- `shipping_rate_rules`
  - Fixed, tiered, or API-derived pricing rules.
- `shipping_quotes`
  - Rate quotes returned to checkout.
- `provider_shipments`
  - External provider shipment IDs and metadata.
- `delivery_sla_breaches`
  - Delay monitoring.

### 6.10 Risk and trust

- `risk_cases`
  - Manual and automated investigations.
- `risk_signals`
  - Refund spikes, card velocity, complaint spikes, restricted keyword triggers.
- `merchant_risk_profiles`
  - Merchant-level risk state and score.
- `transaction_risk_scores`
  - Order/payment-level risk scoring outputs.
- `risk_actions`
  - Hold payout, suspend merchant, cancel order, refund, unblock.
- `watchlist_entries`
  - Customer, merchant, card fingerprint, device, IP, address.

### 6.11 Promotions and content commerce

- `campaigns`
  - Flash sales, percentage discounts, free shipping, BOGO.
- `campaign_rules`
  - Eligibility logic.
- `promo_codes`
  - Redeemable codes.
- `campaign_assets`
  - Banners, images, creative.
- `sponsored_placements`
  - Paid brand placement inventory.
- `content_surfaces`
  - Editorial, event, creator, podcast, story surfaces.
- `content_placements`
  - A specific shoppable placement on a surface.
- `content_product_links`
  - Products attached to content.
- `creator_profiles`
  - Artists, DJs, tastemakers, hosts.
- `creator_store_links`
  - Shareable storefront or creator-specific commerce entry points.

### 6.12 Notifications, analytics, and audits

- `notifications`
  - User notifications in the topbar/activity feed.
- `notification_deliveries`
  - Email, SMS, push delivery attempts.
- `metric_snapshots`
  - Precomputed KPI time series.
- `traffic_attribution_events`
  - Feed, search, creator store, push, external link attribution.
- `report_exports`
  - Server-side export jobs.
- `audit_logs`
  - Cross-domain immutable action history.

## 7. Route-By-Route Backend Requirements

### 7.1 `/merch/get-started`

Current frontend behavior:

- Signup validates business name, contact person, phone, email, and password locally.
- Signup writes a draft onboarding payload into session storage and redirects.
- Login validates locally and immediately navigates to `/merch/analytics`.
- Demo account seeds fake onboarding data.

Backend requirements:

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `GET /me`
- Password hashing and secure session issuance.
- Email uniqueness enforcement.
- Optional email verification and phone verification.
- Create or resume a merchant application draft on signup.
- Rate limiting, brute-force protection, and audit logging.

Primary tables:

- `users`
- `sessions`
- `organizations`
- `organization_members`
- `merchant_applications`
- `auth_audit_log`

### 7.2 `/merch/setup/account`, `/verification`, `/payout`, `/review`

Current frontend behavior:

- Form state is saved in `sessionStorage`.
- Logo upload stores a client-side preview data URL.
- ID and selfie uploads store filenames only.
- Final submit just flips the screen into a success state.

Backend requirements:

- `GET /merchant-applications/current`
- `PATCH /merchant-applications/current`
- `POST /merchant-applications/current/documents`
- `POST /merchant-applications/current/submit`
- `GET /merchant-applications/current/status`
- File upload flow with pre-signed upload URLs or direct storage integration.
- Document virus scanning and mime-type validation.
- Merchant review workflow with admin approve/reject actions.
- Bank/mobile money validation.
- KYC/KYB review notes and status history.
- Resume onboarding across sessions and devices.

Primary tables:

- `merchant_applications`
- `merchant_documents`
- `assets`
- `merchant_payout_accounts`
- `merchant_settlement_preferences`
- `merchant_status_history`

### 7.3 `/merch/analytics`

Current frontend behavior:

- Static KPIs, chart points, traffic-source shares, and top merchants.
- Export button downloads the hard-coded chart series as CSV.

Backend requirements:

- `GET /analytics/overview`
- `GET /analytics/gmv-trend`
- `GET /analytics/traffic-sources`
- `GET /analytics/top-merchants`
- Date range filtering.
- Merchant, category, and region filtering.
- Precomputed or cached aggregate queries.
- Attribution event pipeline for feed, creator store, search, push, and external links.

Primary tables:

- `orders`
- `order_items`
- `payment_transactions`
- `ledger_entries`
- `metric_snapshots`
- `traffic_attribution_events`

### 7.4 `/merch/merchants`

Current frontend behavior:

- Static merchant approval pipeline.
- Static statuses like Approved, Verification, Payout Setup, Featured.
- Email actions use `mailto:`.

Backend requirements:

- `GET /merchants`
- `GET /merchants/:merchantId`
- `PATCH /merchants/:merchantId/status`
- `POST /merchants/:merchantId/review-notes`
- `PATCH /merchants/:merchantId/commission-rule`
- `PATCH /merchants/:merchantId/featured`
- Search, filters, sorting, pagination.
- Merchant detail screen or side panel.
- Approval queue and KYB review evidence.
- Merchant notes, tags, categories, payout readiness, and suspension controls.

Primary tables:

- `merchant_profiles`
- `merchant_status_history`
- `merchant_review_notes`
- `merchant_commission_rules`
- `merchant_documents`
- `storefronts`

### 7.5 `/merch/products`

Current frontend behavior:

- Static moderation queue with status labels like Approved, Low Stock, Featured, Pending Review.
- No real product detail, no variant data, no actual approval actions.

Backend requirements:

- `GET /products`
- `GET /products/:productId`
- `POST /products`
- `PATCH /products/:productId`
- `PATCH /products/:productId/status`
- `POST /products/:productId/media`
- `GET /catalog/moderation-queue`
- Category and brand assignment.
- Variant CRUD and SKU generation.
- Media upload and ordering.
- Restricted keyword detection and moderation workflow.
- Draft, review, approved, rejected lifecycle.

Primary tables:

- `products`
- `product_variants`
- `product_media`
- `categories`
- `product_status_history`
- `product_moderation_cases`
- `restricted_terms`

### 7.6 `/merch/orders`

Current frontend behavior:

- Static kanban columns for Pending, Paid, Processing, Shipped, Delivered, Returned.
- Static order queue rows with fake refund state.
- No real order detail screen.

Backend requirements:

- `GET /orders`
- `GET /orders/:orderId`
- `PATCH /orders/:orderId/status`
- `POST /orders/:orderId/refunds`
- `POST /orders/:orderId/cancel`
- `POST /orders/:orderId/support-cases`
- Search by order ID, customer, merchant, date, status, payment state.
- Full order timeline from payment through delivery and refund.
- Split shipment support if needed.
- Return and exchange workflow.
- Audit trail for every manual intervention.

Primary tables:

- `orders`
- `order_items`
- `order_status_history`
- `shipments`
- `tracking_events`
- `refunds`
- `support_cases`

### 7.7 `/merch/inventory`

Current frontend behavior:

- Static SKU watchlist with stock counts and health labels.
- Auto deduction is shown as enabled but no stock logic exists.

Backend requirements:

- `GET /inventory`
- `PATCH /inventory/:variantId`
- `POST /inventory/adjustments`
- `GET /inventory/alerts`
- SKU-level stock counts.
- Threshold alerts.
- Reservation and decrement logic tied to checkout and payment success.
- Manual restock and correction history.
- Out-of-stock safeguards for active campaigns and collections.

Primary tables:

- `product_variants`
- `product_inventory`
- `inventory_adjustments`
- `inventory_reservations`

### 7.8 `/merch/collections`

Current frontend behavior:

- Static collection cards with timing notes like Live now or Launches in 5 days.
- No launch scheduling or product assignment exists.

Backend requirements:

- `GET /collections`
- `GET /collections/:collectionId`
- `POST /collections`
- `PATCH /collections/:collectionId`
- `POST /collections/:collectionId/products`
- `PATCH /collections/:collectionId/launch-window`
- Support timed drops, countdowns, waitlists, featured placement, and launch calendars.
- Track post-drop performance.

Primary tables:

- `collections`
- `collection_products`
- `collection_launch_windows`
- `homepage_placements`

### 7.9 `/merch/promotions`

Current frontend behavior:

- Static campaign board with Live, Planned, Awaiting assets, and similar labels.
- No discount engine or code redemption exists.

Backend requirements:

- `GET /campaigns`
- `GET /campaigns/:campaignId`
- `POST /campaigns`
- `PATCH /campaigns/:campaignId`
- `POST /promo-codes`
- `PATCH /promo-codes/:promoCodeId`
- Discount engine for percentage, BOGO, free shipping, flash sale, and scheduled campaigns.
- Campaign asset uploads.
- Eligibility by merchant, product, collection, customer segment, and order threshold.
- Sponsored placement inventory and reporting.

Primary tables:

- `campaigns`
- `campaign_rules`
- `promo_codes`
- `campaign_assets`
- `sponsored_placements`

### 7.10 `/merch/customers`

Current frontend behavior:

- Static customer profiles with fake LTV, order counts, support notes, and fraud status.
- Location shares are hard-coded.

Backend requirements:

- `GET /customers`
- `GET /customers/:customerId`
- `POST /customers/:customerId/notes`
- `PATCH /customers/:customerId/segment-memberships`
- `PATCH /customers/:customerId/watchlist-status`
- Search by name, email, phone, order history, geography, segment.
- Customer detail with order history and support history.
- Customer segmentation and CRM-ready statuses.
- Messaging consent tracking.
- Fraud blacklist and support workflows.

Primary tables:

- `customers`
- `customer_addresses`
- `customer_profiles`
- `customer_segments`
- `customer_segment_memberships`
- `customer_notes`
- `customer_blacklist_entries`

### 7.11 `/merch/payments`

Current frontend behavior:

- Static gross sales, commission, fee, and payout metrics.
- Static payout batch table.
- Chart is based on hard-coded monthly values.

Backend requirements:

- `GET /payments/summary`
- `GET /payments/transactions`
- `GET /settlements`
- `GET /settlements/:batchId`
- `POST /settlements/:batchId/approve`
- `POST /refunds`
- Payment provider integration, webhook handling, reconciliation, and internal ledgering.
- Configurable commission and convenience fee rules.
- Settlement batch generation after risk review.
- Payout approval workflow and payout status callbacks.
- Refund and dispute handling.

Primary tables:

- `payment_transactions`
- `payment_provider_events`
- `fee_rules`
- `commission_rules`
- `ledger_entries`
- `settlement_batches`
- `settlement_batch_items`
- `payouts`
- `disputes`
- `refunds`

### 7.12 `/merch/logistics`

Current frontend behavior:

- Static provider performance grid.
- Providers mention API live rates or manual fallback, but nothing is connected.

Backend requirements:

- `GET /logistics/providers`
- `POST /logistics/providers`
- `PATCH /logistics/providers/:providerId`
- `GET /logistics/rate-rules`
- `POST /logistics/quotes`
- `GET /shipments`
- `POST /shipments/:shipmentId/track`
- Provider registry, encrypted credentials, status monitoring, and capability modeling.
- Shipping zones and rate rules.
- Checkout quote retrieval.
- Shipment creation, label handling, and tracking updates.
- Delay detection and SLA breach reporting.

Primary tables:

- `logistics_providers`
- `provider_credentials`
- `shipping_zones`
- `shipping_rate_rules`
- `shipping_quotes`
- `provider_shipments`
- `tracking_events`
- `delivery_sla_breaches`

### 7.13 `/merch/risk`

Current frontend behavior:

- Static risk queue with fake case IDs, scores, and signals.
- No actual case workflow or scoring engine exists.

Backend requirements:

- `GET /risk/cases`
- `GET /risk/cases/:caseId`
- `POST /risk/cases/:caseId/actions`
- `GET /risk/signals`
- `GET /risk/merchant-profiles`
- Automated and manual case creation.
- Risk scoring on orders, payments, merchants, and catalog submissions.
- Payout holds, merchant suspensions, order cancellations, and refund interventions.
- Immutable audit history for all decisions.

Primary tables:

- `risk_cases`
- `risk_signals`
- `merchant_risk_profiles`
- `transaction_risk_scores`
- `risk_actions`
- `watchlist_entries`

### 7.14 `/merch/content-commerce`

Current frontend behavior:

- Static placements for editorial, event, creator, and podcast surfaces.
- Linked SKU counts are fake.

Backend requirements:

- `GET /content/surfaces`
- `GET /content/placements`
- `POST /content/placements`
- `PATCH /content/placements/:placementId`
- `POST /content/placements/:placementId/products`
- Support shoppable editorial, event-linked merch, creator capsules, and shareable storefront links.
- Link products to content surfaces with publish windows and reporting.
- Track attributed conversions from content surfaces into orders.

Primary tables:

- `content_surfaces`
- `content_placements`
- `content_product_links`
- `creator_profiles`
- `creator_store_links`
- `traffic_attribution_events`

### 7.15 `/merch/settings`

Current frontend behavior:

- Static roles and logistics footprint cards.
- No user management, invites, permissions editor, or real policy controls exist.

Backend requirements:

- `GET /roles`
- `POST /roles`
- `PATCH /roles/:roleId`
- `GET /members`
- `POST /members/invite`
- `PATCH /members/:memberId`
- `GET /settings/policies`
- `PATCH /settings/policies`
- Role and permission management.
- Merchant admin and staff invites.
- Policy settings for security, fee controls, and integration toggles.
- Real permission checks enforced in the API and frontend navigation.

Primary tables:

- `roles`
- `permissions`
- `role_permissions`
- `organization_members`
- `member_invitations`
- `audit_logs`

### 7.16 Shared dashboard shell, profile, and notifications

Current frontend behavior:

- Topbar profile chip is hard-coded.
- Notifications are hard-coded marketplace alerts.
- Sidebar and routing are static configuration.

Backend requirements:

- `GET /me`
- `GET /notifications`
- `PATCH /notifications/:notificationId/read`
- Current user profile.
- Current organization context.
- Unread notification counts.
- Real activity generated from merchant reviews, moderation flags, settlement status, risk alerts, and campaign events.

Primary tables:

- `users`
- `organizations`
- `notifications`
- `notification_deliveries`

## 8. External Integrations Required

### 8.1 Payments

- Payment gateway for marketplace checkout and webhook callbacks.
- Payout provider or payout module for merchant settlements.
- Support for Ghana payment methods and mobile money flows.
- Refund and dispute APIs.

Epic-aligned commercial rules that should be configurable rather than hard-coded:

- Marketplace commission: `7.5%` baseline.
- Convenience fee: `1.5%` baseline.
- Delivery commission or logistics margin: `5%` to `10%`.

### 8.2 Logistics

- DHL integration.
- FedEx integration.
- Local courier integration or manual provider adapter.
- Quote retrieval, shipment booking, tracking updates, and provider health monitoring.

### 8.3 Notifications and communications

- Transactional email provider.
- Optional SMS or WhatsApp provider for payout, order, and delivery alerts.
- Internal notification pipeline for topbar activity feed.

### 8.4 File storage and document handling

- Secure storage bucket.
- Signed uploads.
- Signed downloads or protected admin-only file access.
- Basic document validation and malware scanning.

### 8.5 Analytics and attribution

- Event tracking pipeline for traffic source attribution.
- Scheduled aggregation jobs for dashboard metrics.
- Optional BI warehouse later if volume grows.

## 9. Frontend Work Required To Consume The Backend

- Introduce an API client layer.
- Add authenticated route protection.
- Add session persistence and logout handling.
- Replace all static arrays with API-backed queries.
- Replace session-storage onboarding with API-backed draft persistence.
- Replace browser-only file handling with real upload flows.
- Replace browser-only CSV export with server-generated export jobs where datasets get large.
- Add loading states, error states, empty states, and permission-denied states.
- Add pagination, search, sort, and filter query params for table-heavy pages.
- Add optimistic updates carefully only where safe.
- Add mutation confirmations for approval, suspension, refund, and payout actions.
- Add detail views or drawers for merchants, products, orders, customers, settlements, and risk cases.

Recommended frontend additions:

- TanStack Query or equivalent for server-state management.
- Schema validation for API payloads.
- Centralized auth context.
- Shared table/filter primitives.

## 10. What Is Missing Beyond The Admin Console

The current repo is mostly an operations console. Several parts of the epic assume other surfaces that do not exist in this codebase yet. The backend team should know these dependencies exist even if the UI is not built here yet.

- Public customer storefront pages.
- Customer cart and checkout UI.
- Merchant self-service product creation and campaign editing UI.
- Full merchant detail pages.
- Full order detail pages.
- Full settlement detail pages.
- Full risk case detail pages.
- Actual CRM messaging composer or inbox.
- Public creator storefront link destinations.

If those surfaces are being built by another team or in another repo, this backend still needs to support them.

## 11. Recommended Delivery Order

### Phase 1: Foundation

- Set up PostgreSQL schema and migrations.
- Set up auth, sessions, current-user endpoint, and organization scoping.
- Set up object storage and upload flows.
- Add roles and permissions model.
- Add audit logging framework.

### Phase 2: Merchant onboarding and governance

- Implement auth pages and onboarding save/resume.
- Implement merchant application submission and admin review.
- Implement merchant profiles, storefront records, and payout destinations.
- Implement merchant list, filters, and status management.

### Phase 3: Catalog, inventory, and collections

- Implement products, variants, media, and moderation states.
- Implement inventory tables, adjustments, thresholds, and reservations.
- Implement collections, launch windows, and featured placements.

### Phase 4: Orders, payments, and logistics

- Implement orders and order status history.
- Integrate payment provider and webhooks.
- Implement ledger, fees, commissions, settlements, and payouts.
- Implement logistics providers, zones, quotes, shipments, and tracking.

### Phase 5: CRM, risk, and content commerce

- Implement customers, segmentation, notes, and support cases.
- Implement risk case creation, scoring, and interventions.
- Implement campaigns, promo codes, sponsored placements, and content-product linking.

### Phase 6: Analytics, notifications, and hardening

- Implement event tracking and dashboard aggregates.
- Implement notification feed and transactional alerts.
- Replace large client-side exports with server-side jobs.
- Add observability, rate limiting, retry logic, backups, and compliance controls.

## 12. Developer Checklist

### Foundation checklist

- [ ] Choose backend framework and migration tool.
- [ ] Provision PostgreSQL.
- [ ] Provision storage bucket.
- [ ] Set up secrets management.
- [ ] Create base tenant-aware auth model.
- [ ] Create RBAC tables and seed roles.
- [ ] Add audit logging.
- [ ] Add background jobs and webhook retry handling.

### Merchant onboarding checklist

- [ ] Implement register, login, logout, forgot-password, reset-password.
- [ ] Create onboarding draft API.
- [ ] Create document upload API.
- [ ] Validate bank/mobile money payout destinations.
- [ ] Build merchant review queue endpoints.
- [ ] Build approve, reject, suspend actions.

### Catalog and inventory checklist

- [ ] Build categories, products, variants, and media models.
- [ ] Build moderation workflow.
- [ ] Build restricted-term rules.
- [ ] Build SKU-level inventory tracking.
- [ ] Build stock reservation and deduction logic.
- [ ] Build low-stock alerts.

### Order and payment checklist

- [ ] Build order, order item, shipment, return, and refund models.
- [ ] Integrate payment checkout flows and webhooks.
- [ ] Build commission and fee-rule engine.
- [ ] Build internal ledger.
- [ ] Build settlement batch generation.
- [ ] Build payout approval and payout execution tracking.

### Logistics checklist

- [ ] Build providers, zones, and rate rules.
- [ ] Store provider credentials securely.
- [ ] Build quote retrieval and shipment booking.
- [ ] Build tracking event ingestion.
- [ ] Build SLA breach detection.

### CRM, risk, and content checklist

- [ ] Build customer profiles and addresses.
- [ ] Build customer notes and segmentation.
- [ ] Build support case model.
- [ ] Build risk signals, cases, and intervention actions.
- [ ] Build campaigns, promo codes, and sponsored placement support.
- [ ] Build content surfaces and product-link models.

### Frontend integration checklist

- [ ] Add API client and auth context.
- [ ] Replace static arrays with live queries.
- [ ] Replace session-storage onboarding with server-backed drafts.
- [ ] Add loading, empty, error, and unauthorized states.
- [ ] Add filters, search, sort, and pagination.
- [ ] Add real detail pages or drawers for key entities.
- [ ] Add confirmation flows for destructive actions.

## 13. Key Risks If The Team Skips Certain Pieces

- If the team adds only a database and no RBAC, merchant and internal admin permissions will be unsafe.
- If the team adds only CRUD APIs and no audit log, finance and governance actions will be hard to trace.
- If the team adds payments but no ledger model, settlement bugs will be difficult to reconcile.
- If the team adds inventory without reservation logic, flash drops will oversell.
- If the team adds logistics quotes without webhook tracking, order status will drift from provider reality.
- If the team adds CRM data without consent tracking, communications may create compliance problems.
- If the team adds dashboards without precomputed aggregates, analytics pages may become expensive and slow.

## 14. Final Recommendation

- Build this as a modular monolith first, not as many independent microservices on day one.
- Use PostgreSQL as the source of truth.
- Keep all marketplace data tenant-scoped.
- Make commercial rules configurable.
- Treat uploads, payments, payouts, and risk interventions as audited workflows.
- Ship in phases, starting with auth, onboarding, merchant governance, product catalog, and inventory before moving deeper into payouts, logistics, and analytics.

That sequence matches the current UI, the epic, and the fastest path from prototype to a fully operational marketplace admin platform.

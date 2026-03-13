# Black Volta Merchant Ticketing Dashboard

## Backend integration breakdown

This note is based on the current ticketing dashboard that is routed in the app today, not the older merch screens that still exist in `src/pages` but are not active in the router.

At the moment, the product is a frontend prototype with strong UI coverage and very light persistence. Most of the flows that look functional today are powered by:

- `sessionStorage` for onboarding and merchant profile data
- `localStorage` for events, contacts, affiliates, payments, settings, team members, and roles
- static arrays for overview analytics, recent registrations, event detail data, notifications, and some operational metrics

There is no backend client in the app yet, no authentication provider, no server-side permissions, no database schema, and no file storage pipeline. To make the app fully functional, the team will need to replace each of those local-only layers with real APIs, database-backed models, storage, and background processing.

## 1. What is in scope right now

These are the active product areas in the current routed app:

- `/` login and signup
- `/setup/:step` onboarding
- `/overview` portfolio dashboard
- `/events` event management
- `/events/new` create event
- `/events/:eventId/edit` edit event
- `/events/:eventId/:tab` event detail views
- `/contacts` contact management
- `/affiliate` affiliate management
- `/payouts` payments and payouts
- `/settings` profile, team, and role management
- `/settings/:section` detailed settings subsections

There are additional merch-oriented pages still sitting in `src/pages`, but they are not part of the current product surface and should not drive the first backend schema unless the team plans to bring them back.

## 2. Current frontend behavior that will need to be replaced

### Client-side persistence

The app currently stores or seeds data from these frontend modules:

- `src/lib/merchantSetup.ts`
  - organizer profile
  - verification details
  - payout setup
  - uploaded logo preview
  - government ID file name
  - selfie file name
- `src/lib/events.ts`
  - event list
  - event draft data
  - one embedded ticket tier per event
  - recurrence settings
  - fee absorption and waitlist flags
- `src/lib/contacts.ts`
  - contact records
  - customer segment
  - note
  - avatar URL
- `src/lib/affiliates.ts`
  - promoter records
  - tracking codes
  - clicks, sales, revenue, and commission values
- `src/lib/payments.ts`
  - transactions
  - payouts
- `src/lib/settings.ts`
  - notification preferences
  - team members
  - roles
  - permission sets
- `src/data/dashboard.ts`
  - overview KPIs
  - performance chart data
  - recent registrations

### Fake or incomplete flows

These areas look real in the UI but are not wired to any real backend process yet:

- account creation and sign-in
- onboarding submission and approval
- event publishing
- ticket inventory
- order and attendee data in event detail pages
- guestlist and waitlist operations
- check-in
- affiliate attribution
- payout requests
- wallet transfers
- team invites
- role enforcement
- notifications
- exports

## 3. Recommended backend foundation

The cleanest path is a tenant-aware backend built around a relational database, object storage, and a small job layer.

### Core platform pieces

- Relational database
  - PostgreSQL is the simplest fit here because the product has a lot of related business objects and audit needs
- Backend API
  - REST is perfectly fine here
  - GraphQL is optional, not necessary
- Object storage
  - organizer logos
  - ID uploads
  - selfie uploads
  - event banners
  - contact avatars
- Authentication
  - email/password plus session management
  - optional magic link or OTP later
- Background jobs
  - emails
  - payout processing
  - analytics refresh
  - reminder and notification fan-out
- Webhooks
  - payment provider webhooks
  - payout status callbacks
  - optional email delivery events

### Recommended tenancy model

Everything in the dashboard should be scoped to an organization, not just a user.

- one organization
  - the merchant or organizer account
- many users
  - staff members under that organization
- many events
  - owned by that organization
- many contacts, payouts, roles, settings, and notifications
  - all scoped to the same organization

That matters because the current UI already assumes shared team access and role-based permissions.

## 4. Core database model

Below is the minimum practical data model to support the current app without cornering the team later.

### Accounts and access

- `users`
  - id
  - full_name
  - email
  - password_hash
  - phone
  - status
  - last_login_at
  - created_at
  - updated_at
- `organizations`
  - id
  - organizer_name
  - business_type
  - business_address
  - instagram_handle
  - logo_asset_id
  - onboarding_status
  - verification_status
  - created_at
  - updated_at
- `organization_members`
  - id
  - organization_id
  - user_id
  - role_id
  - membership_status
  - invited_by_user_id
  - invited_at
  - joined_at
- `roles`
  - id
  - organization_id nullable for system roles
  - name
  - description
  - is_system_role
  - created_at
  - updated_at
- `role_permissions`
  - id
  - role_id
  - permission_key

### Onboarding and verification

- `organization_onboarding_submissions`
  - id
  - organization_id
  - contact_person
  - email
  - phone
  - business_type
  - business_address
  - instagram_handle
  - registered_business_flag
  - registration_number
  - tin_number
  - payout_method
  - settlement_preference
  - fee_terms_accepted_at
  - compliance_confirmed_at
  - submitted_at
  - reviewed_at
  - reviewed_by_user_id
  - review_notes
  - approval_status
- `verification_documents`
  - id
  - organization_id
  - submission_id
  - asset_id
  - document_type
  - original_file_name
  - mime_type
  - uploaded_at

### Files and assets

- `assets`
  - id
  - organization_id
  - storage_key
  - bucket_name
  - mime_type
  - file_size
  - width nullable
  - height nullable
  - uploaded_by_user_id
  - created_at

### Events and ticketing

- `events`
  - id
  - organization_id
  - title
  - slug
  - description
  - status
  - event_type
  - monetization
  - location_type
  - location_name
  - location_address nullable
  - external_event_url nullable
  - banner_asset_id nullable
  - absorbs_fee
  - waitlist_enabled
  - created_by_user_id
  - published_at nullable
  - cancelled_at nullable
  - ended_at nullable
  - created_at
  - updated_at
- `event_schedules`
  - id
  - event_id
  - schedule_type
  - start_at
  - end_at
  - recurrence_frequency nullable
  - recurrence_interval nullable
  - recurrence_days nullable
  - recurrence_end_at nullable
- `ticket_types`
  - id
  - event_id
  - name
  - price_minor
  - currency
  - inventory_limit nullable
  - sales_start_at
  - sales_end_at
  - status
  - sort_order

### Orders, attendees, guestlist, waitlist, and check-in

- `customers`
  - id
  - organization_id
  - full_name
  - email
  - phone
  - avatar_asset_id nullable
  - marketing_status nullable
  - created_at
  - updated_at
- `orders`
  - id
  - organization_id
  - event_id
  - customer_id
  - order_number
  - status
  - payment_status
  - subtotal_minor
  - fees_minor
  - discount_minor
  - total_minor
  - currency
  - source_channel
  - affiliate_id nullable
  - promo_code_id nullable
  - created_at
  - paid_at nullable
- `order_items`
  - id
  - order_id
  - ticket_type_id
  - quantity
  - unit_price_minor
  - total_price_minor
- `attendees`
  - id
  - organization_id
  - event_id
  - order_id nullable
  - customer_id nullable
  - full_name
  - email
  - phone nullable
  - ticket_type_id nullable
  - attendance_status
  - qr_code_token
  - checked_in_at nullable
  - checked_in_by_user_id nullable
- `guestlist_entries`
  - id
  - event_id
  - customer_id nullable
  - full_name
  - email
  - invite_status
  - invited_by_user_id
  - invited_at
  - claimed_at nullable
- `waitlist_entries`
  - id
  - event_id
  - customer_id nullable
  - full_name
  - email
  - phone nullable
  - status
  - added_at
  - converted_at nullable
- `checkin_logs`
  - id
  - event_id
  - attendee_id
  - scanned_by_user_id
  - scan_method
  - result
  - created_at

### Affiliates, codes, and attribution

- `affiliates`
  - id
  - organization_id
  - name
  - email
  - phone nullable
  - tracking_code
  - commission_type
  - commission_value
  - status
  - created_at
  - updated_at
- `affiliate_event_assignments`
  - id
  - affiliate_id
  - event_id
  - active_flag
  - created_at
- `promo_codes`
  - id
  - organization_id
  - event_id nullable
  - code
  - discount_type
  - discount_value
  - usage_limit nullable
  - starts_at nullable
  - ends_at nullable
  - created_at
- `affiliate_clicks`
  - id
  - affiliate_id
  - event_id
  - visit_token
  - landing_url
  - referrer nullable
  - ip_hash nullable
  - user_agent nullable
  - created_at

### Payments, payouts, and wallet

- `payment_transactions`
  - id
  - organization_id
  - order_id nullable
  - event_id nullable
  - provider
  - provider_reference
  - title
  - category
  - status
  - amount_minor
  - currency
  - settled_at nullable
  - created_at
- `payout_accounts`
  - id
  - organization_id
  - account_type
  - provider_name
  - account_name
  - account_number_masked nullable
  - mobile_number_masked nullable
  - network nullable
  - bank_name nullable
  - is_default
  - verified_at nullable
- `payout_requests`
  - id
  - organization_id
  - payout_account_id
  - amount_minor
  - currency
  - requested_by_user_id
  - status
  - requested_at
  - processed_at nullable
  - provider_reference nullable
  - failure_reason nullable
- `wallet_ledger_entries`
  - id
  - organization_id
  - entry_type
  - source_type
  - source_id nullable
  - amount_minor
  - balance_after_minor
  - currency
  - created_at

### Settings, notifications, and audit

- `organization_settings`
  - id
  - organization_id
  - sales_emails
  - payout_emails
  - product_emails
  - push_sales
  - push_payouts
  - push_promotions
  - two_factor_enabled
  - login_alerts
  - onboarding_checklist_done
  - updated_at
- `notifications`
  - id
  - organization_id
  - user_id nullable
  - type
  - title
  - body
  - status
  - action_url nullable
  - created_at
  - read_at nullable
- `audit_logs`
  - id
  - organization_id
  - actor_user_id nullable
  - entity_type
  - entity_id
  - action
  - metadata_json
  - created_at

## 5. What should be stored versus derived

This will save a lot of pain later.

### Store directly

- organizations and users
- onboarding submissions
- verification documents
- events and ticket types
- customers, orders, attendees, guestlist, waitlist
- affiliates and promo codes
- payout accounts and payout requests
- wallet ledger entries
- notification records
- audit logs

### Derive on demand or through materialized reporting

- overview KPIs
- chart data
- total revenue by event
- total tickets sold
- average ticket price
- recent registrations
- affiliate performance summaries
- event occupancy and readiness
- payout available balance

If those summary numbers are written directly to the main tables without a proper ledger or reporting process behind them, the app will drift out of sync quickly.

## 6. Feature-by-feature backend breakdown

### A. Authentication and account creation

#### What exists in the app now

- signup and login UI
- local validation
- no real user records
- no password handling beyond the browser
- no authenticated session

#### What needs to be built

- user registration endpoint
- email uniqueness checks
- password hashing
- login endpoint
- session or token handling
- logout
- forgot password and reset password flow
- optional email verification
- organization bootstrapping on first signup

#### Minimum API surface

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `GET /me`

### B. Onboarding and merchant verification

#### What exists in the app now

- four-step onboarding flow
- logo upload
- government ID and selfie file pickers
- payout setup fields
- review screen
- success state

#### What needs to be built

- draft save endpoint for onboarding
- file upload endpoints or signed upload flow
- submission endpoint
- approval workflow
- status tracking
- admin review tooling or back-office process
- document storage and retention rules

#### Important notes

- the current UI stores file names and image previews only
- the backend will need the original files plus secure retrieval rules
- approval should not just be a boolean; it needs states like `draft`, `submitted`, `under_review`, `approved`, `rejected`

#### Minimum API surface

- `GET /onboarding`
- `PUT /onboarding`
- `POST /onboarding/assets`
- `POST /onboarding/submit`
- `GET /onboarding/status`

### C. Merchant profile and settings

#### What exists in the app now

- editable organizer profile
- upload new logo in settings
- payout preferences
- email and security preference screens

#### What needs to be built

- organization profile endpoint
- logo upload and replacement rules
- payout account management
- settings persistence
- change history for sensitive fields

#### Minimum API surface

- `GET /organization`
- `PATCH /organization`
- `POST /organization/logo`
- `GET /settings`
- `PATCH /settings`
- `GET /payout-accounts`
- `POST /payout-accounts`
- `PATCH /payout-accounts/:id`

### D. Overview dashboard

#### What exists in the app now

- hardcoded KPIs
- hardcoded chart data
- hardcoded recent registrations
- client-side export

#### What needs to be built

- analytics aggregation by date range
- recent registrations feed
- event counts and revenue rollups
- export endpoints backed by real data

#### Recommended approach

- for the first pass, compute directly from orders, attendees, and events
- once data volume grows, move to reporting tables or materialized views

#### Minimum API surface

- `GET /dashboard/overview?range=lifetime`
- `GET /dashboard/recent-registrations`
- `GET /dashboard/export?range=lifetime&format=csv`

### E. Events management

#### What exists in the app now

- event list
- filters and search
- create event
- edit event
- draft and publish actions
- one embedded ticket setup in the form

#### What needs to be built

- event CRUD
- slug generation and collision handling
- schedule validation
- banner upload
- ticket type CRUD
- publish workflow
- event status transitions
- server-side search, filters, and pagination

#### Important notes

- the current event model only supports one ticket tier directly on the event object
- the backend should not mirror that shortcut
- ticket tiers should be their own table from day one

#### Minimum API surface

- `GET /events`
- `POST /events`
- `GET /events/:id`
- `PATCH /events/:id`
- `POST /events/:id/publish`
- `POST /events/:id/cancel`
- `GET /events/:id/ticket-types`
- `POST /events/:id/ticket-types`
- `PATCH /ticket-types/:id`

### F. Event detail pages

The event detail page is the deepest part of the product and will drive a large share of the backend work.

#### Tabs present in the current UI

- overview
- orders
- attendees
- tickets
- waitlist
- check-in
- guestlist
- capacity

#### What needs to be real

- per-event metrics and summaries
- real order tables
- attendee records
- ticket tier performance
- waitlist queue
- guestlist invites and claim states
- check-in scanning and duplicate-scan protection
- capacity calculations
- promo codes
- promoter assignment per event

#### Backend implications by tab

- `overview`
  - event summary aggregates
  - ticket sales and revenue breakdown
  - event-level operational metrics
- `orders`
  - order search
  - payment status
  - order detail
  - refund or cancellation hooks if planned
- `attendees`
  - attendee search
  - export
  - status updates
- `tickets`
  - inventory counts
  - sales windows
  - promo code application
- `waitlist`
  - add entry
  - convert entry to ticket or RSVP
  - notification workflow when inventory reopens
- `check-in`
  - QR validation endpoint
  - check-in log
  - device/user attribution
  - duplicate scan handling
- `guestlist`
  - invite creation
  - invite acceptance
  - guest status tracking
- `capacity`
  - total capacity
  - allocated versus available
  - waitlist threshold logic

#### Minimum API surface

- `GET /events/:id/dashboard`
- `GET /events/:id/orders`
- `GET /events/:id/attendees`
- `GET /events/:id/waitlist`
- `POST /events/:id/waitlist`
- `GET /events/:id/guestlist`
- `POST /events/:id/guestlist`
- `POST /events/:id/check-in/scan`
- `GET /events/:id/capacity`
- `GET /events/:id/promo-codes`
- `POST /events/:id/promo-codes`

### G. Contacts

#### What exists in the app now

- list view
- search
- segment filters
- add and edit modal
- profile pictures
- notes
- export

#### What needs to be built

- customer table
- deduping rules
- optional merge logic later
- contact source tracking
- notes or CRM activity if the team wants to keep growing this area
- avatar upload support

#### Recommended modeling choice

Use a proper `customers` table and let contacts be the merchant-facing CRM view of those customers. Do not create an entirely separate contact record that cannot be tied back to orders and attendees.

#### Minimum API surface

- `GET /customers`
- `POST /customers`
- `GET /customers/:id`
- `PATCH /customers/:id`
- `POST /customers/:id/avatar`
- `GET /customers/export`

### H. Affiliates

#### What exists in the app now

- affiliate list
- invite affiliate
- edit affiliate
- tracking code
- clicks, sales, revenue, and commission metrics
- active and paused status

#### What needs to be built

- affiliate CRUD
- per-event assignment
- real tracking links
- click tracking
- attribution rules from visit to order
- commission calculation
- payout eligibility if affiliate payouts are planned

#### Important note

Right now, affiliate performance is just a stored number on the frontend. Once this goes live, those metrics should come from orders and attribution data, not be edited directly.

#### Minimum API surface

- `GET /affiliates`
- `POST /affiliates`
- `PATCH /affiliates/:id`
- `POST /affiliates/:id/invite`
- `POST /affiliates/:id/assign-event`
- `GET /affiliates/:id/performance`

### I. Payments, payouts, and promo wallet

#### What exists in the app now

- payment history tab
- payout request flow
- provider selection
- promo wallet transfer flow
- summary cards for available balance, wallet, and pending

#### What needs to be built

- payment transaction ingestion
- order-to-payment linkage
- payout balance computation
- payout request creation
- payout account verification
- payout processing workflow
- payout status updates from provider
- wallet ledger
- wallet transfer rules
- finance-grade audit trail

#### Important notes

- this area needs a ledger, not just a set of totals
- available balance should be calculated from cleared funds minus fees, refunds, chargebacks, prior payouts, and wallet transfers
- pending payouts and failed payouts must stay queryable and auditable

#### Minimum API surface

- `GET /finance/summary`
- `GET /finance/transactions`
- `GET /finance/payouts`
- `POST /finance/payouts`
- `GET /finance/wallet`
- `POST /finance/wallet/transfers`

### J. Team management and roles

#### What exists in the app now

- add team member
- choose role
- pending and active status
- role management modal
- permission groups

#### What needs to be built

- real member invites
- invite acceptance flow
- membership records
- role assignment
- custom roles scoped to the organization
- permission enforcement on both frontend and backend

#### Important note

The app currently lets roles exist in the UI, but nothing is actually protected by them. That means this work is not finished when the `roles` table exists. The team also needs route guards, API authorization checks, and action-level permission checks.

#### Minimum API surface

- `GET /team-members`
- `POST /team-members/invite`
- `PATCH /team-members/:id`
- `DELETE /team-members/:id`
- `GET /roles`
- `POST /roles`
- `PATCH /roles/:id`
- `DELETE /roles/:id`

### K. Notifications

#### What exists in the app now

- a static notification tray in the top bar

#### What needs to be built

- notification records
- unread state
- links to related screens
- delivery rules for in-app versus email versus push

#### Minimum API surface

- `GET /notifications`
- `POST /notifications/:id/read`

### L. Exports

#### What exists in the app now

- local CSV and fake PDF downloads generated in the browser

#### What needs to be built

- real export jobs or direct streaming endpoints
- permission checks
- consistent formats for finance, attendees, contacts, and overview reports

#### Minimum API surface

- `GET /exports/contacts`
- `GET /exports/payouts`
- `GET /exports/attendees`
- `GET /exports/dashboard`

## 7. Background jobs and asynchronous work

The dashboard will not feel finished without a small async layer.

### Jobs the team will need

- send invite emails for team members
- send guestlist invitations
- send affiliate invitations
- send onboarding status updates
- send payout status notifications
- refresh reporting aggregates
- process or retry payout requests
- convert waitlist entries when capacity opens up
- send reminder emails for upcoming events

### Webhooks the team will need

- payment succeeded
- payment failed
- refund issued
- payout completed
- payout failed

If the payment processor supports it, those webhook events should write to `payment_transactions`, `orders`, `payout_requests`, and `audit_logs`.

## 8. Frontend changes required once the backend exists

This is not just a database task. The frontend will need a structural pass too.

### Replace local storage helpers

These modules will need to stop being the source of truth:

- `src/lib/merchantSetup.ts`
- `src/lib/events.ts`
- `src/lib/contacts.ts`
- `src/lib/affiliates.ts`
- `src/lib/payments.ts`
- `src/lib/settings.ts`
- `src/data/dashboard.ts`

### Add a real data layer

- API client
- request helpers
- auth-aware fetch handling
- loading states
- error states
- optimistic updates only where safe
- cache invalidation or a query library if the team wants one

### Add access control in the UI

- do not show actions the current user cannot perform
- do not rely on the frontend alone; backend checks still need to exist

### Handle uploads properly

- signed upload URLs or multipart endpoints
- upload progress
- replace and delete logic
- asset cleanup rules

## 9. Security and compliance considerations

These should be designed up front, especially because this app handles identity documents and payouts.

- password hashing and session security
- organization-level authorization on every query
- encryption for sensitive data at rest where appropriate
- strict access control for uploaded ID and selfie assets
- audit trail for profile, payout, and permission changes
- safe storage of provider references and masked financial details
- webhook signature verification
- rate limiting on auth and check-in endpoints
- tamper-resistant QR or ticket validation tokens

## 10. Recommended implementation phases

Trying to ship everything at once will slow the team down. The cleanest order is:

### Phase 1: Auth, organization, and onboarding

- user registration and login
- organization creation
- onboarding persistence
- asset uploads
- profile/settings read and write

### Phase 2: Events and ticket structure

- event CRUD
- ticket type CRUD
- event publishing
- event list filters and search

### Phase 3: Orders, attendees, and dashboard data

- orders
- attendees
- recent registrations
- overview KPIs and chart data
- exports

### Phase 4: Operational event tabs

- guestlist
- waitlist
- check-in
- capacity
- promo codes

### Phase 5: Finance and affiliates

- payment ingestion
- payout requests
- wallet ledger
- affiliate attribution

### Phase 6: Team, roles, notifications, and hardening

- team invites
- role enforcement
- in-app notifications
- audit logs
- reporting refinements

## 11. Open questions to settle before development starts

These decisions will affect the schema and integrations, so they should be locked early:

- Which payment provider is the source of truth for ticket payments?
- Will payouts be handled by the same provider or a separate payout service?
- Is the app single-currency for now, or should the schema be multi-currency from day one?
- Are team roles organization-wide only, or can they be scoped per event later?
- Should contacts be editable independently from order-attendee records, or should certain fields be read-only once they come from a transaction?
- Will affiliates be paid inside this system, or is the current scope just attribution and reporting?
- Does the business want a manual approval queue for onboarding, or an automated rules-based approval path?
- Is check-in expected to work offline at the venue, or is constant connectivity acceptable?
- Does the product need public event pages and checkout in the same codebase, or is that a separate frontend?

## 12. Delivery checklist for the developers

### Foundation

- [ ] Choose backend stack and hosting approach
- [ ] Provision PostgreSQL
- [ ] Provision object storage
- [ ] Set up environments and secrets
- [ ] Add migration workflow
- [ ] Add seed data strategy

### Auth and tenancy

- [ ] Build user registration and login
- [ ] Add organization bootstrap on first signup
- [ ] Add organization member model
- [ ] Add session handling
- [ ] Add password reset flow

### Onboarding and settings

- [ ] Persist onboarding drafts
- [ ] Add file upload pipeline for logo, ID, and selfie
- [ ] Add onboarding submission and review states
- [ ] Add organization profile endpoints
- [ ] Add payout account endpoints

### Events

- [ ] Build events table and ticket types table
- [ ] Add event CRUD endpoints
- [ ] Add publish and cancel actions
- [ ] Add banner uploads
- [ ] Add recurring schedule support

### Transactional data

- [ ] Build customers, orders, order items, and attendees
- [ ] Build guestlist and waitlist tables
- [ ] Build check-in logging
- [ ] Add recent registrations feed

### Finance

- [ ] Build transaction ingestion
- [ ] Build payout requests
- [ ] Build payout account verification
- [ ] Build wallet ledger
- [ ] Add payout and wallet APIs

### Growth and CRM

- [ ] Build contacts endpoints
- [ ] Build affiliate tables and event assignments
- [ ] Build tracking and attribution rules
- [ ] Build promo code support

### Team and permissions

- [ ] Build team invite flow
- [ ] Build custom role CRUD
- [ ] Add permission enforcement in API
- [ ] Add permission-aware UI behavior

### Reporting and notifications

- [ ] Replace static overview data with computed metrics
- [ ] Add export endpoints
- [ ] Add notification records and unread state
- [ ] Add audit logging

### Frontend integration

- [ ] Remove local storage as the source of truth
- [ ] Add API client layer
- [ ] Add loading, empty, and error states
- [ ] Add upload progress handling
- [ ] Add optimistic updates only where they are safe

## 13. Short summary

The frontend is already a solid product shell, but almost every meaningful business workflow still needs backend support. The biggest pieces are not just “connecting to a database.” They are:

- introducing a real organization and user model
- replacing local storage with API-backed persistence
- normalizing events, ticketing, customers, orders, and payouts into proper relational tables
- adding file storage for logos, banners, and verification documents
- building financial and operational workflows that can hold up in production

If the team starts with auth, onboarding, events, and core transactional data, the rest of the dashboard can be layered in cleanly without having to rewrite the foundation later.

# Product Blueprint

## Goal

Build a cloud product for nonprofits, implementers, and grantmakers that combines:

- CRM
- fundraising
- programs and service delivery
- grantmaking
- monitoring, evaluation, and learning
- external stakeholder portals

The system should preserve the useful operational patterns of Salesforce Nonprofit Cloud and AMP-style impact management while reducing licensing cost and increasing product control.

## User Experiences

### Operations App

Primary users:

- CRM managers
- program officers
- MEL officers
- grant managers
- finance staff
- executives

Primary UX patterns:

- dashboard home by role
- filterable work queues
- record workspaces
- spreadsheet-style data entry for results, targets, budgets, and disbursements
- task-driven action panels
- cross-object global search
- report dashboards

Top-level navigation:

- Home
- CRM
- Fundraising
- Programs
- Grants
- MEL
- Tasks
- Reports
- Admin

### External Portal

Primary users:

- applicants
- grantees
- reviewers
- partner staff

Primary UX patterns:

- task inbox
- guided wizards
- simple status tracking
- secure document uploads
- review workspaces
- profile maintenance

Portal navigation:

- Home
- My Applications
- My Grants
- Reports Due
- Documents
- Messages
- Organization Profile

## Domain Modules

### Core CRM

- people
- households
- organizations
- relationships
- notes
- tasks
- files
- activity history

### Fundraising

- campaigns
- gifts
- pledges
- recurring giving
- designations
- donor portfolios

### Programs

- programs
- cohorts
- enrollments
- services
- referrals
- sessions
- attendance
- case records

### Grants

- funding opportunities
- applications
- review rounds
- reviewers
- awards
- disbursements
- grant reports

### MEL

- frameworks
- objectives
- indicators
- reporting periods
- targets
- results
- baselines
- disaggregations

### Delivery and Risk

- projects
- work plans
- activities
- milestones
- budget lines
- expenses
- risks
- mitigations

## Multi-Tenancy

The first release should use a shared application and shared PostgreSQL database with tenant scoping on every business record.

Core tenancy entities:

- `tenant`
- `tenant_membership`
- `tenant_role`
- `tenant_plan`
- `tenant_feature_flag`
- `tenant_domain`
- `tenant_usage_event`

Isolation rules:

- every business table carries `tenant_id`
- all API queries are tenant-scoped
- file storage paths are tenant-scoped
- audit entries include tenant, actor, action, and target
- background jobs run with explicit tenant context

Enterprise upgrades can later offer:

- dedicated database
- dedicated environment
- SSO and stronger compliance controls

## Monetization

Recommended pricing shape:

- base subscription by plan
- included usage allowance
- metered overages

Primary billable usage events:

- applications submitted
- reports submitted
- result records entered
- active internal users
- active external users
- storage consumed

## Technical Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- TanStack Table
- React Hook Form
- Zod

### Backend

- Django
- Django REST Framework
- PostgreSQL
- Redis
- Celery

### Platform Services

- S3-compatible object storage
- Stripe billing
- Metabase reporting
- PostHog analytics
- Sentry monitoring

## Deployment Design

Initial deployment shape:

- `web`: Next.js application
- `api`: Django application
- `worker`: Celery worker
- `db`: PostgreSQL
- `cache`: Redis
- `storage`: S3-compatible bucket

Recommended progression:

- early stage: Render, Fly.io, or Railway
- growth stage: AWS ECS/Fargate or GCP Cloud Run
- enterprise stage: isolated deployments for premium tenants

## First Vertical Slice

The first implementation slice should prove the architecture end to end:

1. tenant model
2. user membership and roles
3. funding opportunity
4. application submission
5. review assignment
6. internal review queue
7. portal status view

That slice exercises:

- internal UX
- external UX
- multi-tenant security
- workflow state
- notifications
- billing events

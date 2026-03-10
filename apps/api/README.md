# API

This Django app will provide:

- tenant-aware APIs
- domain models for CRM, grants, programs, and MEL
- workflow orchestration
- usage metering

Initial build priorities:

1. tenant and membership models
2. authentication and authorization
3. grantmaking workflow models
4. REST API for the first vertical slice

## First Vertical Slice Endpoints

Base path: `/api/`

- `tenants/`
- `tenant-memberships/`
- `organizations/`
- `funding-opportunities/`
- `applications/`
- `review-assignments/`
- `usage-events/`

Healthcheck: `/health/`

### Tenant scoping

For tenant-scoped resources, pass tenant context via either:

- HTTP header: `X-Tenant-Id: <tenant-uuid>`
- Query param: `?tenant_id=<tenant-uuid>`

Without tenant context, tenant-scoped list endpoints return an empty result set.

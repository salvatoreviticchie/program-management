# Infrastructure Outline

## Services

- `apps/web`: Next.js frontend
- `apps/api`: Django API
- `worker`: background jobs
- `postgres`: primary database
- `redis`: cache and task queue
- `metabase`: analytics

## Runtime Environments

- local development
- staging
- production

## Security Baseline

- tenant-aware authorization
- signed file URLs
- encrypted secrets
- automatic backups
- structured application logs
- Sentry error monitoring
- audit trail for business actions

## Metering Baseline

The system should emit usage events for:

- application submission
- report submission
- active user login
- file upload
- result entry

These events should roll up into monthly tenant usage for billing.

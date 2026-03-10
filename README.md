# Nonprofit Operations Platform

This repository is the starting point for a multi-tenant SaaS platform that combines:

- nonprofit CRM
- grantmaking workflows
- program delivery
- MEL / impact measurement
- external portals

The target product replaces the combination of Salesforce Nonprofit Cloud and AMP-style program and impact management with a cheaper, cloud-native stack.

## Architecture

- `apps/web`: Next.js frontend for internal operations and external portal UX
- `apps/api`: Django backend for core business logic and APIs
- `docs`: product, UX, data model, and infrastructure documentation

## Product Shape

The platform is split into two experiences:

- `Operations App`: internal staff for CRM, grants, programs, MEL, and reporting
- `External Portal`: applicants, grantees, reviewers, and partners

Both experiences run on a shared multi-tenant platform with:

- tenant-aware authorization
- metered billing
- configurable workflows
- reporting and auditability

## Current Scope

This initial scaffold includes:

- product blueprint
- UX architecture
- tenancy model
- technical deployment design
- initial repository structure for implementation

## Next Build Steps

1. Implement the tenant-aware Django data model.
2. Add authentication, RBAC, and tenant scoping.
3. Build the first Next.js shell for internal operations.
4. Add the first vertical workflow: grant applications and review.

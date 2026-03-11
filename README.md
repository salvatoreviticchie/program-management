# Nonprofit Operations Platform

This repository is the starting point for a multi-tenant SaaS platform that combines:

- nonprofit CRM
- grantmaking workflows
- program delivery
- MEL / impact measurement
- external portals

The target product delivers a modern, cloud-native program and impact management stack with lower operating cost and stronger product control.

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

## Local Development Quickstart

### Web (Next.js)

```bash
cd apps/web
npm install
npm run dev
```

Open: `http://localhost:3000`

### API (Django)

Python venv support is required on Ubuntu/Debian:

```bash
sudo apt-get update && sudo apt-get install -y python3.12-venv
```

Then run:

```bash
cd apps/api
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -e .
python manage.py makemigrations platform_core grants
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

Healthcheck: `http://localhost:8000/health/`

# Initial Data Model

## Design Principles

- use explicit relational models instead of polymorphic CRM shortcuts
- keep shared primitives reusable across modules
- separate catalog records from project or grant-specific instances
- support configurable forms and workflow states without making the entire schema dynamic

## Core CRM

### Party

Common identity root for all constituent entities.

Suggested tables:

- `party`
- `person`
- `household`
- `organization`
- `relationship`
- `address`
- `email_address`
- `phone_number`

### Activity

- `task`
- `note`
- `timeline_event`
- `file_attachment`

## Grants

- `funding_opportunity`
- `application`
- `application_section`
- `application_response`
- `review_round`
- `review_assignment`
- `review_response`
- `award`
- `disbursement`
- `grant_report`

## MEL

- `framework`
- `framework_node`
- `indicator`
- `indicator_assignment`
- `reporting_period`
- `baseline`
- `target`
- `result`
- `disaggregation_group`
- `disaggregation_value`
- `result_disaggregation`

## Programs

- `program`
- `program_cohort`
- `participant_enrollment`
- `service`
- `service_delivery`
- `referral`
- `case_record`

## Delivery

- `project`
- `workplan`
- `activity`
- `milestone`
- `budget_line`
- `expense`
- `risk`
- `risk_assessment`

## Workflow Engine

- `submission_template`
- `submission`
- `workflow_definition`
- `workflow_state`
- `workflow_transition`
- `approval_step`

## Tenancy And Security

Every business table should include:

- `id`
- `tenant_id`
- `created_at`
- `updated_at`
- `created_by_id`
- `updated_by_id`

Security-sensitive tables should also support:

- soft deletion
- audit logging
- optional record ownership
- status-based locking

## Near-Term Priority Models

Start implementation with:

- `tenant`
- `user`
- `tenant_membership`
- `organization`
- `funding_opportunity`
- `application`
- `review_assignment`

Those are enough to support the first working grantmaking workflow.

import uuid

from django.db import models

from platform_core.models import Organization, TenantMembership, TenantScopedModel


class FundingOpportunity(TenantScopedModel):
    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        OPEN = "open", "Open"
        CLOSED = "closed", "Closed"
        AWARDED = "awarded", "Awarded"

    title = models.CharField(max_length=255)
    status = models.CharField(max_length=16, choices=Status.choices, default=Status.DRAFT)
    opens_on = models.DateField(null=True, blank=True)
    closes_on = models.DateField(null=True, blank=True)
    summary = models.TextField(blank=True)

    def __str__(self) -> str:
        return self.title


class Application(TenantScopedModel):
    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        SUBMITTED = "submitted", "Submitted"
        IN_REVIEW = "in_review", "In Review"
        REVISIONS_REQUESTED = "revisions_requested", "Revisions Requested"
        APPROVED = "approved", "Approved"
        DECLINED = "declined", "Declined"

    funding_opportunity = models.ForeignKey(FundingOpportunity, on_delete=models.CASCADE)
    applicant_organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    status = models.CharField(max_length=24, choices=Status.choices, default=Status.DRAFT)
    project_title = models.CharField(max_length=255)
    amount_requested = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    submitted_at = models.DateTimeField(null=True, blank=True)

    def __str__(self) -> str:
        return self.project_title


class ReviewAssignment(TenantScopedModel):
    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        STARTED = "started", "Started"
        SUBMITTED = "submitted", "Submitted"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    application = models.ForeignKey(Application, on_delete=models.CASCADE)
    reviewer_membership = models.ForeignKey(TenantMembership, on_delete=models.CASCADE)
    status = models.CharField(max_length=16, choices=Status.choices, default=Status.PENDING)
    score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    recommendation = models.TextField(blank=True)
    submitted_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ("application", "reviewer_membership")

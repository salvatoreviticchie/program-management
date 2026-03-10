import uuid

from django.conf import settings
from django.db import models


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Tenant(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    is_active = models.BooleanField(default=True)

    def __str__(self) -> str:
        return self.name


class TenantScopedModel(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="%(class)s_created",
    )
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="%(class)s_updated",
    )

    class Meta:
        abstract = True


class TenantMembership(TimeStampedModel):
    class Role(models.TextChoices):
        ADMIN = "admin", "Admin"
        CRM_MANAGER = "crm_manager", "CRM Manager"
        PROGRAM_OFFICER = "program_officer", "Program Officer"
        MEL_OFFICER = "mel_officer", "MEL Officer"
        GRANT_MANAGER = "grant_manager", "Grant Manager"
        REVIEWER = "reviewer", "Reviewer"
        PORTAL_USER = "portal_user", "Portal User"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    role = models.CharField(max_length=32, choices=Role.choices)
    is_active = models.BooleanField(default=True)

    class Meta:
        unique_together = ("tenant", "user", "role")


class Organization(TenantScopedModel):
    legal_name = models.CharField(max_length=255)
    display_name = models.CharField(max_length=255, blank=True)
    website = models.URLField(blank=True)
    country_code = models.CharField(max_length=2, blank=True)

    def __str__(self) -> str:
        return self.display_name or self.legal_name


class UsageEvent(TenantScopedModel):
    event_type = models.CharField(max_length=64)
    quantity = models.PositiveIntegerField(default=1)
    reference = models.CharField(max_length=255, blank=True)
    occurred_at = models.DateTimeField()

    class Meta:
        ordering = ["-occurred_at"]

from rest_framework import viewsets

from .models import Organization, Tenant, TenantMembership, UsageEvent
from .serializers import (
    OrganizationSerializer,
    TenantMembershipSerializer,
    TenantSerializer,
    UsageEventSerializer,
)


class TenantScopedMixin:
    tenant_lookup_header = "HTTP_X_TENANT_ID"

    def _get_tenant_id(self):
        return self.request.META.get(self.tenant_lookup_header) or self.request.query_params.get(
            "tenant_id"
        )

    def get_queryset(self):
        queryset = super().get_queryset()
        tenant_id = self._get_tenant_id()
        if tenant_id:
            return queryset.filter(tenant_id=tenant_id)
        return queryset.none()

    def perform_create(self, serializer):
        tenant_id = self._get_tenant_id()
        serializer.save(
            tenant_id=tenant_id,
            created_by=self.request.user if self.request.user.is_authenticated else None,
            updated_by=self.request.user if self.request.user.is_authenticated else None,
        )

    def perform_update(self, serializer):
        serializer.save(
            updated_by=self.request.user if self.request.user.is_authenticated else None,
        )


class TenantViewSet(viewsets.ModelViewSet):
    queryset = Tenant.objects.all().order_by("name")
    serializer_class = TenantSerializer


class TenantMembershipViewSet(viewsets.ModelViewSet):
    queryset = TenantMembership.objects.select_related("tenant", "user").all()
    serializer_class = TenantMembershipSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        tenant_id = self.request.query_params.get("tenant_id")
        if tenant_id:
            return queryset.filter(tenant_id=tenant_id)
        return queryset


class OrganizationViewSet(TenantScopedMixin, viewsets.ModelViewSet):
    queryset = Organization.objects.select_related("tenant").all().order_by("legal_name")
    serializer_class = OrganizationSerializer


class UsageEventViewSet(TenantScopedMixin, viewsets.ModelViewSet):
    queryset = UsageEvent.objects.select_related("tenant").all()
    serializer_class = UsageEventSerializer

from django.http import JsonResponse
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from grants.views import ApplicationViewSet, FundingOpportunityViewSet, ReviewAssignmentViewSet
from platform_core.views import (
    OrganizationViewSet,
    TenantMembershipViewSet,
    TenantViewSet,
    UsageEventViewSet,
)


def healthcheck(_: object) -> JsonResponse:
    return JsonResponse({"status": "ok"})


router = DefaultRouter()
router.register("tenants", TenantViewSet, basename="tenant")
router.register("tenant-memberships", TenantMembershipViewSet, basename="tenant-membership")
router.register("organizations", OrganizationViewSet, basename="organization")
router.register("usage-events", UsageEventViewSet, basename="usage-event")
router.register("funding-opportunities", FundingOpportunityViewSet, basename="funding-opportunity")
router.register("applications", ApplicationViewSet, basename="application")
router.register("review-assignments", ReviewAssignmentViewSet, basename="review-assignment")


urlpatterns = [
    path("health/", healthcheck, name="healthcheck"),
    path("api/", include(router.urls)),
]

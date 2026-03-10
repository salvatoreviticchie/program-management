from rest_framework import viewsets

from platform_core.views import TenantScopedMixin

from .models import Application, FundingOpportunity, ReviewAssignment
from .serializers import (
    ApplicationSerializer,
    FundingOpportunitySerializer,
    ReviewAssignmentSerializer,
)


class FundingOpportunityViewSet(TenantScopedMixin, viewsets.ModelViewSet):
    queryset = FundingOpportunity.objects.select_related("tenant").all().order_by("title")
    serializer_class = FundingOpportunitySerializer


class ApplicationViewSet(TenantScopedMixin, viewsets.ModelViewSet):
    queryset = Application.objects.select_related(
        "tenant", "funding_opportunity", "applicant_organization"
    ).all()
    serializer_class = ApplicationSerializer


class ReviewAssignmentViewSet(TenantScopedMixin, viewsets.ModelViewSet):
    queryset = ReviewAssignment.objects.select_related(
        "tenant", "application", "reviewer_membership"
    ).all()
    serializer_class = ReviewAssignmentSerializer

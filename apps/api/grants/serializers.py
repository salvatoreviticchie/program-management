from rest_framework import serializers

from .models import Application, FundingOpportunity, ReviewAssignment


class FundingOpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = FundingOpportunity
        fields = [
            "id",
            "tenant",
            "title",
            "status",
            "opens_on",
            "closes_on",
            "summary",
            "created_at",
            "updated_at",
            "created_by",
            "updated_by",
        ]
        read_only_fields = ["id", "created_at", "updated_at", "created_by", "updated_by"]


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = [
            "id",
            "tenant",
            "funding_opportunity",
            "applicant_organization",
            "status",
            "project_title",
            "amount_requested",
            "submitted_at",
            "created_at",
            "updated_at",
            "created_by",
            "updated_by",
        ]
        read_only_fields = ["id", "created_at", "updated_at", "created_by", "updated_by"]


class ReviewAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewAssignment
        fields = [
            "id",
            "tenant",
            "application",
            "reviewer_membership",
            "status",
            "score",
            "recommendation",
            "submitted_at",
            "created_at",
            "updated_at",
            "created_by",
            "updated_by",
        ]
        read_only_fields = ["id", "created_at", "updated_at", "created_by", "updated_by"]

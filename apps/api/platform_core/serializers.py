from rest_framework import serializers

from .models import Organization, Tenant, TenantMembership, UsageEvent


class TenantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tenant
        fields = ["id", "name", "slug", "is_active", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]


class TenantMembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = TenantMembership
        fields = [
            "id",
            "tenant",
            "user",
            "role",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = [
            "id",
            "tenant",
            "legal_name",
            "display_name",
            "website",
            "country_code",
            "created_at",
            "updated_at",
            "created_by",
            "updated_by",
        ]
        read_only_fields = ["id", "created_at", "updated_at", "created_by", "updated_by"]


class UsageEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsageEvent
        fields = [
            "id",
            "tenant",
            "event_type",
            "quantity",
            "reference",
            "occurred_at",
            "created_at",
            "updated_at",
            "created_by",
            "updated_by",
        ]
        read_only_fields = ["id", "created_at", "updated_at", "created_by", "updated_by"]

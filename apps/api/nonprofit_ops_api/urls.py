from django.http import JsonResponse
from django.urls import path


def healthcheck(_: object) -> JsonResponse:
    return JsonResponse({"status": "ok"})


urlpatterns = [
    path("health/", healthcheck, name="healthcheck"),
]

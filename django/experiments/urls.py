from django.urls import path, include

from .views import ExperimentsViewSet

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('', ExperimentsViewSet)
urlpatterns = [
    path("", include(router.urls)),
]

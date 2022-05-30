from django.urls import path, include

from .views import AnimalsViewSet, AnimalNotesViewSet

from rest_framework_nested import routers

router = routers.SimpleRouter()
router.register(r'animals', AnimalsViewSet)


notes_router = routers.NestedSimpleRouter(router, r'animals', lookup="note")
notes_router.register(r'notes', AnimalNotesViewSet, basename='animal-notes')

urlpatterns = [
    path(r"", include(router.urls)),
    path(r"", include(notes_router.urls)),
]

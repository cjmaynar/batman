"""batapp URL Configuration"""
from django.urls import path, include

from .views import App, Login, Logout, UserProfile, UserList

urlpatterns = [
    path("", App.as_view()),
    path("", include("animals.urls")),
    path("login", Login.as_view()),
    path("logout", Logout.as_view()),
    path("users/", UserList.as_view()),
    path("account/user", UserProfile.as_view()),
    path("experiments/", include("experiments.urls")),
]

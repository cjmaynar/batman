from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.views.generic import TemplateView

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied


class App(TemplateView):
    template_name ="index.html"


class Login(APIView):
    def post(self, request):
        email = request.data.get('email', "")
        password = request.data.get('password', "")
        user = authenticate(username=email, password=password)
        if not user:
            raise PermissionDenied("Invalid user account information")
        login(request, user)

        return Response({
            "authenticated": True,
            "username": request.user.username,
        })

class Logout(APIView):
    def post(self, request):
        Response({})

class UserProfile(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            return Response({
                "authenticated": True,
                "username": request.user.username,
                "id": request.user.id,
            })

        raise PermissionDenied()


class UserList(APIView):
    def get(self, request):
        users = []

        for user in User.objects.all():
            users.append({
                "value": user.id,
                "label": user.username,
            })
        return Response(users)

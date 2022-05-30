from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response


from .models import Animal, Note
from .serializers import AnimalSerializer, NoteSerializer


class AnimalsViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer


class AnimalNotesViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

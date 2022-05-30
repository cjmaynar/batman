from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Animal, Note
from experiments.models import Experiment

class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "id")


class AnimalSerializer(serializers.ModelSerializer):
    primary_caretaker = UserModelSerializer()
    caretakers = UserModelSerializer(many=True)
    class Meta:
        model = Animal
        fields = "__all__"


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = "__all__"

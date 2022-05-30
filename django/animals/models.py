from django.db import models
from django.contrib.auth.models import User

from experiments.models import Experiment

# Create your models here.

class Animal(models.Model):
    name = models.CharField(max_length=255)
    primary_caretaker = models.ForeignKey(User, on_delete=models.CASCADE, related_name="primary_caretaker")
    caretakers = models.ForeignKey(User, on_delete=models.CASCADE, related_name="caretakers", null=True, blank=True)
    birthdate = models.DateField()
    deathdate = models.DateField(null=True, blank=True)
    experiments = models.ManyToManyField(Experiment, related_name="animals")
    weights = models.JSONField(default=list)


class Note(models.Model):
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    content = models.TextField()
    date = models.DateField(auto_now=True)
    animal = models.ForeignKey(Animal, related_name="notes", on_delete=models.CASCADE)

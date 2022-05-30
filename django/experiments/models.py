from django.db import models

from django.contrib.auth.models import User


class Experiment(models.Model):
    name = models.CharField(max_length=255)
    people = models.ManyToManyField(User, related_name="experiments")
    start = models.DateField()
    end = models.DateField(blank=True, null=True)
    summary = models.TextField(blank=True, null=True)

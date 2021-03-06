# Generated by Django 4.0.3 on 2022-05-29 21:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('experiments', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Animal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('birthdate', models.DateField()),
                ('weights', models.JSONField(default=list)),
                ('caretakers', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='caretakers', to=settings.AUTH_USER_MODEL)),
                ('experiments', models.ManyToManyField(related_name='animals', to='experiments.experiment')),
                ('primary_caretaker', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='primary_caretaker', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

# Generated by Django 4.0.4 on 2022-05-29 23:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('animals', '0002_note'),
    ]

    operations = [
        migrations.AddField(
            model_name='animal',
            name='deathdate',
            field=models.DateField(blank=True, null=True),
        ),
    ]
# Generated by Django 4.0.4 on 2022-05-29 22:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('experiments', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='experiment',
            name='summary',
            field=models.TextField(blank=True, null=True),
        ),
    ]
# Generated by Django 5.0.3 on 2024-08-23 10:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointment', '0002_remove_appointment_client_email_appointment_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='category',
            field=models.CharField(max_length=100),
        ),
    ]

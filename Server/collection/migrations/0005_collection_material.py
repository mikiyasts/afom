# Generated by Django 4.2.6 on 2024-02-02 19:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('collection', '0004_collection_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='collection',
            name='material',
            field=models.TextField(null=True),
        ),
    ]

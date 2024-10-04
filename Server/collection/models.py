
from django.db import models
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.models import User

from django.dispatch import receiver

from django.utils import timezone

CATEGORY_CHOICES = (('wedding', 'Wedding'), ('graduation', 'Graduation'), ('dinner', 'Dinner'))



class Collection(models.Model):
    category=models.CharField(max_length=15, choices=CATEGORY_CHOICES)
    title = models.TextField()
    description = models.TextField()
    banner = models.ImageField(blank=True, null = True, upload_to= 'images/')
    right = models.ImageField(blank=True, null = True, upload_to= 'images/')
    left = models.ImageField(blank=True, null = True, upload_to= 'images/')
    back = models.ImageField(blank=True, null = True, upload_to= 'images/')
   
    material = models.TextField(null = True)
   


    def __str__(self):
        return self.title
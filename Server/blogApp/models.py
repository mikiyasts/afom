from unicodedata import category
from django.db import models
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.models import User

from django.dispatch import receiver
from django.db.models.signals import post_save
from django.utils import timezone


CATEGORY_CHOICES = (('wedding', 'Wedding'), ('graduation', 'Graduation'), ('dinner', 'Dinner'))




class Post(models.Model):
    category=models.CharField(max_length=15, choices=CATEGORY_CHOICES)
    title = models.TextField()
    author = models.ForeignKey(User,on_delete=models.CASCADE)
    blog_post = models.TextField()
    banner = models.ImageField(blank=True, null = True, upload_to= 'images/')
    status = models.IntegerField(default = 0, blank=True, null = True)
    date_added = models.DateTimeField(default=timezone.now, blank=True, null = True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
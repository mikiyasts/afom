from django.db import models
from django.utils import timezone


class Appointment(models.Model):
    
    STATUS_CHOICES = [
        ('Scheduled', 'Scheduled'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
    ]

   
    client_name = models.CharField(max_length=100)
    category=models.CharField(max_length=100)
    client_phone = models.CharField(max_length=15)
    appointment_date = models.DateTimeField()
    notes = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Scheduled')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.client_name} - {self.appointment_date.strftime("%Y-%m-%d %H:%M")}'

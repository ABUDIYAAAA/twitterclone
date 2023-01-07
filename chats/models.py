from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.


class Chats(models.Model):
    users = models.ManyToManyField(User, related_name='reciveuser')


class Messages(models.Model):
    message = models.TextField()
    image = models.ImageField(
        upload_to="uploads/message_photos", null=True, blank=True)
    created_on = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    chat = models.ForeignKey('Chats', on_delete=models.CASCADE)

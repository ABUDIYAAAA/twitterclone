from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
# Create your models here.
class Threads(models.Model):
    user1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user1")
    user2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user2")

class Messages(models.Model):
    message = models.TextField()
    created_on = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="author")
    thread = models.ForeignKey('Threads', on_delete=models.CASCADE)
    read = models.BooleanField(default=False)

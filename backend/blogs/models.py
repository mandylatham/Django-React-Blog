from django.db import models
from django.contrib.auth.models import User


class Blog(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    likes = models.IntegerField(default=0)
    unlikes = models.IntegerField(default=0)
    owner = models.ForeignKey(
        User, related_name="blogs", on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.title

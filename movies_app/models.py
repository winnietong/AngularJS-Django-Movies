from django.db import models

# Create your models here.

class Favorite(models.Model):
    title = models.CharField(max_length=100)
    poster = models.URLField()
    movieID = models.IntegerField()


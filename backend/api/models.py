from django.db import models

class Expense(models.Model):
    title = models.CharField(max_length=100)
    amount = models.IntegerField()

    def __str__(self):
        return self.text
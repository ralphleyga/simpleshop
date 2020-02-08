from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager


class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True, max_length=254)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ()
    objects = UserManager()

    def get_initial(self):
        return self.email[0].upper()
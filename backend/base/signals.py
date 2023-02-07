from django.db.models.signals import pre_save
from django.contrib.auth.models import User

# Function that is fired off when user model is saved
def updateUser(sender, instance, **kwargs):
    user = instance
    if user.email != '':
        user.username = user.email

# Before the model is saved, updateUser function is fired off
pre_save.connect(updateUser, sender=User)


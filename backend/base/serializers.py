from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product

# Wraps around Product model and turns it into JSON format
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        # Has 2 required attributes we need. 1st -> Model we want to serialize, 2nd -> Fields we want to render out
        model = Product
        # __all__ -> Returns everything
        fields = '__all__'
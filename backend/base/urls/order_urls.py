from django.urls import path
from base.views import order_views as views

# Configuring urls to know when to trigger the views
urlpatterns = [
    path('add/', views.addOrderItems, name='orders-add'),
    path('<str:pk>/', views.getOrderById, name='user-order'),
]
from django.urls import path
from base.views import event_views as views

urlpatterns = [
    path('', views.eventList, name='event-list'),
    
    path('create/', views.createEvent, name="event-create"),
    path('upload/', views.uploadImage, name="image-upload"),

    path('<str:pk>/', views.event_detail, name='bidding'),

    path('update/<str:pk>/', views.updateEvent, name="event-update"),
    path('delete/<str:pk>/', views.deleteEvent, name="event-delete"),
]
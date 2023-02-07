from django.urls import path
from base.views import user_views as views


# Configuring urls to know when to trigger the views
urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), 
            name='token_obtain_pair'),
    path('register/', views.registerUser, name='register'),
    path('profile/', views.getUserProfile, name="user-profile"),
    path('', views.getUsers, name="users"),
]
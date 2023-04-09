from django.urls import path
from base.views import user_views as views


# Configuring urls to know when to trigger the views
urlpatterns = [
    path('', views.getUsers, name="users"),
    path('login/', views.MyTokenObtainPairView.as_view(), 
            name='token_obtain_pair'),
    path('register/', views.registerUser, name='register'),
    path('activate/<str:uidb64>/<str:token>/', views.activate_account, name='activate_account'),
    path('password-reset/', views.password_reset, name='password_reset'),
    path('password-reset-confirm/<str:uidb64>/<str:token>/', views.password_reset_confirm, name='password_reset_confirm'),
    path('profile/', views.getUserProfile, name="user-profile"),
    path('profile/update/', views.updateUserProfile, name="user-profile-update"),

    path('<str:pk>/', views.getUserById, name="user"),
    path('update/<str:pk>/', views.updateUser, name="user-update"),

    path('delete/<str:pk>/', views.deleteUser, name="user-delete"),
]
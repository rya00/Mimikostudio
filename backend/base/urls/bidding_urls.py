from django.urls import path
from base.views import bidding_views as views

# Configuring urls to know when to trigger the views
urlpatterns = [
    path('', views.bidding_product_list, name='biddings'),

    path('create/', views.create_bidding_product, name='bidding-product-create'),
    path('upload/', views.uploadImage, name="image-upload"),

    path('<str:pk>/bids/', views.createProductBid, name='bidding-product-bid'),
    path('<str:pk>/', views.bidding_product_detail, name='bidding'),

    path('update/<str:pk>/', views.update_bidding_product, name='bidding-product-update'),
    path('delete/<str:pk>/', views.delete_bidding_product, name='bidding-product-delete'),
    
]



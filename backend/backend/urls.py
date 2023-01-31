from django.contrib import admin
from django.urls import path, include

from django.conf import settings
# Function that allows us to connect our urls
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/', include('base.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

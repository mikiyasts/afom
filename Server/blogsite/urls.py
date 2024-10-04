from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from blog_api import urls as blog_urls
from collection import urls as collection_url
from blogApp import urls as blogapp

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(blogapp)),
    path('blog/', include('blogApp.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(blog_urls)),
    path('collection/', include(collection_url)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
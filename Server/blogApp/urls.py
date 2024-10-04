from . import views
from django.contrib import admin
from django.urls import path, re_path
from django.contrib.auth import views as auth_views
from django.views.generic.base import RedirectView

urlpatterns = [
    path('redirect-admin', RedirectView.as_view(url="/admin"),name="redirect-admin"),
    path('', views.home, name="home-page"),

   
    path('view_post/<int:pk>',views.view_post,name='view-post'),
 
]

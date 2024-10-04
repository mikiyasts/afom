from . import views
from django.contrib import admin
from django.urls import path, re_path
from django.contrib.auth import views as auth_views
from django.views.generic.base import RedirectView

urlpatterns = [
    path('redirect-admin', RedirectView.as_view(url="/admin"),name="redirect-admin"),
    path('',views.collection_list,name='collection_list'),
    path('view_collection/<int:pk>',views.view_collection,name='view-collection'),
 
]
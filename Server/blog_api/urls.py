from . import views
from django.contrib import admin
from django.urls import path, re_path
from django.contrib.auth import views as auth_views
from django.views.generic.base import RedirectView
from .views import FormView, GenerateAPIKeyView, SendMessageView
from .views import (
    PostListApiView,
    PostDetailApiView,
    CollectionListApiView,
    CollectionDetailApiView,
    collectionCreate,
    collectionUpdate,
    collectionDelete,
    blogCreate,
    blogUpdate,
 ReservedDate,
    blogDelete,
    AppointmentListApiView,
    AppointmentDetailApiView,
AppointmentCreate,
    
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', views.APIendpoints),
    path('blog/', PostListApiView.as_view()),
    path('blog/<int:post_id>/', PostDetailApiView.as_view()),
    path('collection/', CollectionListApiView.as_view()),
    path('collection/<int:collection_id>/', CollectionDetailApiView.as_view()),
    path('form/', FormView.as_view(), name="form"),
    path('collection-create/', collectionCreate.as_view()),
    path('collection-update/<str:pk>/', collectionUpdate.as_view()),
    path('collection-delete/<str:pk>/', views.collectionDelete),
    path('blog-create/', blogCreate.as_view()),
    path('blog-update/<str:pk>/', blogUpdate.as_view()),
    path('blog-delete/<int:pk>/', views.blogDelete),
  
	path('login/', views.login, name='login'),
	path('logout/', views.logout, name='logout'),
    path('getuser/', views.GetUser, name='getuser'),
    path('appointment/', AppointmentListApiView.as_view()),
    path('appointment/<int:appointment_id>/', AppointmentDetailApiView.as_view()),
    path('appointment-create/', AppointmentCreate.as_view()),
    path('reserved_dates/', ReservedDate.as_view()),
    path('generate-apikey/',GenerateAPIKeyView.as_view()),
    path('sendsms/',SendMessageView.as_view()),
	


    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),

] 
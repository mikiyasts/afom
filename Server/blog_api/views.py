# import datetime
from datetime import datetime
import json
from django.shortcuts import get_object_or_404
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from blogApp.models import Post
from collection.models import Collection
from appointment.models import Appointment
from .serializers import PostSerializer, CollectionSerializer, AppointmentSerializer, AppointmentDateSerializer, UserGetSerializer
from rest_framework.permissions import AllowAny
from django.core.mail import send_mail
from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse
from rest_framework import status
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.core.mail import EmailMultiAlternatives
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import AllowAny
from .serializers import LoginSerializer
from rest_framework.authtoken.models import Token
from django.db.models import Count
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
import logging
import requests
import json
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView





from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer
from rest_framework import permissions, status
from .validations import custom_validation, validate_email, validate_password
from rest_framework.decorators import api_view ,permission_classes
from django.contrib.auth import authenticate
from .models import APIKey
import secrets
from .authentication import APIKeyAuthentication


logger = logging.getLogger(__name__)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def APIendpoints( request ):
    collection={
    'blog/':'blog list',
    'blog/<int:post_id>/':'blog detail list',
    'collection/':'collection list',
    'collection/<int:collection_id>/':'collection detail list',
    'collection-create/':'create collection', 
    'collection-update/<str:pk>/':'update collection', 
    'collection-delete/<str:pk>/':'delete collection', 
    'blog-create/':'create blog',
    'blog-update/<str:pk>/':'update blog', 
    'blog-delete/<int:pk>/':'delete blog', 
	'login/':'login to account', 
	'logout/':'logout', 
	'user/':'list of loged in user', 
    'appointment/':'list of appointments',
    'appointment/<int:pk>':'appointment detail ',
    'appointment-create/':'create appointment',
    'reserved_dates/':'reserved dates',
    }
        
    return Response(collection, status=status.HTTP_200_OK)

class GenerateAPIKeyView(APIView):
    def post(self, request):
        user = request.user
        api_key, created = APIKey.objects.get_or_create(user=user)
        if created:
            api_key.key = secrets.token_urlsafe(32)
            api_key.save()
        elif not api_key.key:
            api_key.key = secrets.token_urlsafe(32)
            api_key.save()
        return Response({'api_key': api_key.key})

#Login
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'detail': 'Username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)
    
    user = authenticate(username=username, password=password)
    if not user:
        return Response({'detail': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
    
    refresh = RefreshToken.for_user(user)
    user_serializer = UserSerializer(user)
    response = Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'user': user_serializer.data
    }, status=status.HTTP_200_OK)
    response.set_cookie(
        key='auth_token',
        value=str(refresh.access_token),
        httponly=True,
        secure=True,
        samesite='Lax',
        max_age=3600
    )

    return response



#GetUser
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def GetUser(request):
    try:
        user = request.user
        if user.is_authenticated:
            logger.info(f"User {user.username} is still logged in.")
            return Response({'detail': 'User is still logged in.'}, status=status.HTTP_200_OK)
        else:
            logger.info("User is logged out.")
            return Response({'detail': 'User is logged out.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.error(f"Error checking user status: {str(e)}")
        return Response({'detail': 'Error checking user status.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

   
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    refresh_token = request.data.get('refresh_token')
    if not refresh_token:
        return Response({'detail': 'Refresh token is required.'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        token_obj = RefreshToken(refresh_token)
        token_obj.blacklist()
        logger.info(f"User {request.user.username} successfully logged out.")
        return Response({'detail': 'Successfully logged out.'}, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"Logout failed for user {request.user.username}: {str(e)}")
        return Response({'detail': 'Invalid refresh token.'}, status=status.HTTP_400_BAD_REQUEST)
#Blog list

class PostListApiView(APIView):
    authentication_classes = [APIKeyAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        todos = Post.objects.all()
        todos = list(todos)
        todos.reverse() 
        serializer = PostSerializer(todos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


#Blog Detail
class PostDetailApiView(APIView):
    authentication_classes = [APIKeyAuthentication]
    permission_classes = [IsAuthenticated]
    def get_object(self, post_id):
        try:
            return Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return None
    def get(self, request, post_id, *args, **kwargs):
        post_instance = self.get_object(post_id)
        if not post_instance:
            return Response(
                {"res": "Object with todo id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer = PostSerializer(post_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

#Blog Create
@permission_classes([IsAuthenticated])
class blogCreate(APIView):
    def post(self, request, format=None):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  
            return Response(serializer.data, status=status.HTTP_201_CREATED)  
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  

#Blog Update
@permission_classes([IsAuthenticated])
class blogUpdate(APIView):
    def post(self, request, pk ):
        blog=Post.objects.get(id=pk)
        serializer = PostSerializer(instance=blog,data=request.data)
        if serializer.is_valid():
            serializer.save()  
            return Response(serializer.data, status=status.HTTP_201_CREATED)  
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)     
    


#Blog Delete
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def blogDelete( request, pk ):
    blog=Post.objects.get(id=pk) 
    if blog.delete():
        return Response("Item deleted", status=status.HTTP_201_CREATED)  
    return Response("unable to delete item", status=status.HTTP_400_BAD_REQUEST)



#Collection List       
@permission_classes([IsAuthenticated])
class CollectionListApiView(APIView):
    def get(self, request, *args, **kwargs):

        todos = Collection.objects.all()
        todos = list(todos)
        todos.reverse() 
        serializer = CollectionSerializer(todos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
     
       
#Collection Detail
@permission_classes([IsAuthenticated])
class CollectionDetailApiView(APIView):
    def get_object(self, collection_id):
        try:
            return Collection.objects.get(id=collection_id)
        except Collection.DoesNotExist:
            return None
    def get(self, request, collection_id, *args, **kwargs):
        collection_instance = self.get_object(collection_id)
        if not collection_instance:
            return Response(
                {"res": "Object with todo id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer = CollectionSerializer(collection_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)


#Collection Create
@permission_classes([IsAuthenticated])
class collectionCreate(APIView):
    def post(self, request, format=None):
        serializer = CollectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  
            return Response(serializer.data, status=status.HTTP_201_CREATED)  
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  
    


#Collection Update     
@permission_classes([IsAuthenticated])
class collectionUpdate(APIView):
    def post(self, request, pk ):
        collection=Collection.objects.get(id=pk)
        serializer = CollectionSerializer(instance=collection,data=request.data)
        if serializer.is_valid():
            serializer.save()  
            return Response(serializer.data, status=status.HTTP_201_CREATED)  
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  



#Collection Delete
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def collectionDelete( request, pk ):
    collection=Collection.objects.get(id=pk)   
    if collection.delete():
        return Response("Item deleted", status=status.HTTP_201_CREATED)  
    return Response("unable to delete item", status=status.HTTP_400_BAD_REQUEST)
 
 
#Appointment List
@permission_classes([IsAuthenticated])
class AppointmentListApiView(APIView):
    def get(self, request, *args, **kwargs):
        appointments = Appointment.objects.all()
        appointments = list(appointments)
        appointments.reverse() 
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
    
#Appointment Detail
@permission_classes([IsAuthenticated])
class AppointmentDetailApiView(APIView):
    def get_object(self, appointment_id):
        try:
            return Appointment.objects.get(id=appointment_id)
        except Appointment.DoesNotExist:
            return None
    def get(self, request, appointment_id, *args, **kwargs):
        appointment_instance = self.get_object(appointment_id)
        if not appointment_instance:
            return Response(
                {"res": "Object with todo id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer = AppointmentSerializer(appointment_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

#Appointment Create
@permission_classes([IsAuthenticated])
class AppointmentCreate(APIView):
    def post(self, request, format=None):
      serializer = AppointmentSerializer(data=request.data)
      if serializer.is_valid():
         serializer.save()  
         return Response(serializer.data, status=status.HTTP_201_CREATED)  
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
#Reserved Dates
@permission_classes([IsAuthenticated])
class ReservedDate(APIView):
    def get(self, request, *args, **kwargs):
        date_counts = (Appointment.objects
                       .values('appointment_date__date')
                       .annotate(appointment_count=Count('id'))
                       .filter(appointment_count__gte=3)
                       .order_by('-appointment_date__date'))
        reserved_dates = [
            {
                'date': date_count['appointment_date__date'].strftime('%Y-%m-%d'),
                'count': date_count['appointment_count']
            }
            for date_count in date_counts
        ]
        serializer = AppointmentDateSerializer({'reserved_dates': reserved_dates})
        return Response(serializer.data, status=status.HTTP_200_OK)



class FormView(APIView):
    def post(self, request):
        data = request.data
        print(data)
        subject = 'A new message from client'
        context = {'data': data}
        html_message = render_to_string('messageTemplate.html', context) 
        plain_message = strip_tags(html_message)  
        from_email = 'mtkdomain@gmail.com'
        to_email = ['mikiyas.tse@gmail.com','wanofiisrael17@gmail.com','abels5112@gmail.com']
        try:
            email = EmailMultiAlternatives(subject, plain_message, from_email, to_email)
            email.attach_alternative(html_message, "text/html")  
            email.send()
            return Response({"message": "Form submitted successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
 
class SendMessageView(APIView):
    def post(self, request):
        try:
            data = json.loads(request.body)
            to = data['to']
        except (json.JSONDecodeError, KeyError):
            return Response({'status': 'error', 'message': 'Invalid JSON payload'}, status=400)

        token = 'eyJhbGciOiJIUzI1NiJ9.eyJpZGVudGlmaWVyIjoiNFRZVkRGV3F2bjZsRG9GMUJtU3paNFVPbTdlS0pSbHEiLCJleHAiOjE4ODU2NDMxMzQsImlhdCI6MTcyNzg3NjczNCwianRpIjoiZTczYmE1ZDMtNzA0OC00NGY1LTlkOTEtNzAyNDczZjRmYTU3In0.qurF7mMmYCaH3WUbWjwsSCRi_UMl3nbT8HD4YQGpBas'
        base_url = 'https://api.afromessage.com/api/send'
        headers = {'Authorization': 'Bearer ' + token}
        callback = ''
        from_id = 'e80ad9d8-adf3-463f-80f4-7c4b39f7f164'
        sender_name = ''
        message = 'Hello'  # You can also get this from the request if needed

        url = f'{base_url}?from={from_id}&sender={sender_name}&to={to}&message={message}&callback={callback}'

        session = requests.Session()
        result = session.get(url, headers=headers)

        if result.status_code == 200:
            json_response = result.json()
            if json_response['acknowledge'] == 'success':
                return Response({'status': 'success', 'message': 'API success'})
            else:
                return Response({'status': 'error', 'message': 'API error'})
        else:
            return Response({'status': 'error', 'message': f'HTTP error: {result.status_code} - {result.content}'})   
        
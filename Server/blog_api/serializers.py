from rest_framework import serializers
from blogApp.models import Post
from collection.models import Collection
from django.forms import ValidationError
from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from collection.models import Collection
from django.contrib.auth.models import User
from appointment.models import Appointment

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["id","category", "title", "author", "blog_post", "banner", "status", "date_added", "date_updated"]
        ordering = ["-date_added"] 
        
        
class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = ["id","category", "title", "description", "banner","right","left","back","material"]

class AppointmentSerializer(serializers.ModelSerializer):
	class Meta:
		model = Appointment
		fields =["id","client_name","category","client_phone","appointment_date","notes","status","created_at","updated_at"]


UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = '__all__'
	def create(self, clean_data):
		user_obj = UserModel.objects.create_user(email=clean_data['email'], password=clean_data['password'])
		user_obj.username = clean_data['username']
		user_obj.save()
		return user_obj

class UserLoginSerializer(serializers.Serializer):
	email = serializers.EmailField()
	password = serializers.CharField()
	##
	def check_user(self, clean_data):
		user = authenticate(username=clean_data['email'], password=clean_data['password'])
		if not user:
			raise ValidationError('user not found')
		return user

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = ('email', 'username')
class UserGetSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = ('email', 'username')

class LoginSerializer(serializers.Serializer):
	username = serializers.CharField(max_length=255)
	password =serializers.CharField(max_length=128,write_only=True)
	def validate(self, attrs):
		username = attrs['username']
		password= attrs['password']

		user= User.objects.filter(username=username).first()
		if user and user.check_password(password):
			attrs['user'] = user
			return attrs

		raise serializers.ValidationError('Invalid credentials')

class ReservedDateSerializer(serializers.Serializer):
   date = serializers.DateField(format='%Y-%m-%d')
   count = serializers.IntegerField()


class AppointmentDateSerializer(serializers.Serializer):
    reserved_dates = ReservedDateSerializer(many=True)
    
    
    

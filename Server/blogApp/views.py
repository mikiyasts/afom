from unicodedata import category
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout

from django.contrib.auth.decorators import login_required

from django.contrib.auth.models import User
from django.contrib import messages
from blogApp.models import Post




def home(request):
    posts = Post.objects.filter(status = 1).all()
    context={'posts':posts}
    print(request.user)
    return render(request, 'home.html',context)


def view_post(request,pk=None):
    
    if pk is None:
        messages.error(request,"Unabale to view Post")
        return redirect('home-page')
    else:
        post = Post.objects.filter(id = pk).first()
        context={'post':post}
    return render(request, 'view_post.html',context)




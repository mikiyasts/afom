from unicodedata import category
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout

from django.contrib.auth.decorators import login_required

from django.contrib.auth.models import User
from django.contrib import messages
from collection.models import Collection



def collection_list(request):
    collections = Collection.objects.all()
    context={'collections':collections}
    return render(request, 'collection_list.html',context)




def view_collection(request,pk=None):
    
    if pk is None:
        messages.error(request,"Unabale to view collection")
        return redirect('home-page')
    else:
        collections = Collection.objects.filter(id = pk).first()
        context={'collections':collections}
    return render(request, 'view_collection.html',context)
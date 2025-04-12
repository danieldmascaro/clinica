from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializers import *
from django.middleware.csrf import get_token
from django.http import JsonResponse
# Create your views here.
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({'csrfToken': request.META.get("CSRF_COOKIE")})

def homeView(request):
    return render (request, 'home.html')
 




 
 
 

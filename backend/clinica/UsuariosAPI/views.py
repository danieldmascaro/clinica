from django.shortcuts import render
from .models import *
from .serializers import *
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth import get_user_model

@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({'csrfToken': request.META.get("CSRF_COOKIE")})

def homeView(request):
    return render (request, 'home.html')

@api_view(["GET"])
def get_tipo_usuario(request):
    uidb64 = request.GET.get("uid")
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = get_user_model().objects.get(pk=uid)
        return Response({"tipo_usuario": user.tipo_usuario})
    except Exception:
        return Response({"error": "Usuario no válido"}, status=400)
 




 
 
 

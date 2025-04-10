from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializers import *
# Create your views here.

def homeView(request):
    return render (request, 'home.html')
 
class CustomUserListCreateAPIView(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    

class PacienteListCreateAPIView(generics.ListCreateAPIView):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer
    




 
 
 

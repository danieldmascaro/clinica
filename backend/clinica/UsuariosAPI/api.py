from .models import *
from .serializers import *
from rest_framework import viewsets, permissions, generics
from .filters import *



class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CustomUserSerializer

class RegistrarPacienteView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomPacienteRegisterSerializer
    permission_classes = [permissions.AllowAny]
    
class RegionViewSet(viewsets.ModelViewSet):
    queryset = Region.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegionSerializer
    
class CiudadViewSet(viewsets.ModelViewSet):
    queryset = Ciudad.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CiudadSerializer
    
class ComunaViewSet(viewsets.ModelViewSet):
    queryset = Comuna.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ComunaSerializer
    
class PrevisionViewSet(viewsets.ModelViewSet):
    queryset = Prevision.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = PrevisionSerializer
    




    




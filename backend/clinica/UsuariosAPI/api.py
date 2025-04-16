from .models import *
from .serializers import *
from rest_framework import viewsets, permissions, generics
from rest_framework.parsers import MultiPartParser, FormParser
from .filters import *



class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CustomUserSerializer

class RegistrarPacienteViewSet(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomPacienteRegisterSerializer
    permission_classes = [permissions.AllowAny]

class RegistrarMedicoViewSet(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomMedicoRegisterSerializer
    permission_classes = [permissions.IsAdminUser]
    
class MedicoViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.filter(tipo_usuario="medico")
    serializer_class = MedicoSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [permissions.AllowAny]

class EspecialidadViewSet(viewsets.ModelViewSet):
    queryset = Especialidad.objects.all()
    serializer_class = EspecialidadSerializer
    permission_classes = [permissions.AllowAny]
    
class RegionViewSet(viewsets.ModelViewSet):
    queryset = Region.objects.all()
    permission_classes = [permissions.IsAdminUser]
    serializer_class = RegionSerializer
    
class CiudadViewSet(viewsets.ModelViewSet):
    queryset = Ciudad.objects.all()
    permission_classes = [permissions.IsAdminUser]
    serializer_class = CiudadSerializer
    
class ComunaViewSet(viewsets.ModelViewSet):
    queryset = Comuna.objects.all()
    permission_classes = [permissions.IsAdminUser]
    serializer_class = ComunaSerializer
    
class PrevisionViewSet(viewsets.ModelViewSet):
    queryset = Prevision.objects.all()
    permission_classes = [permissions.IsAdminUser]
    serializer_class = PrevisionSerializer
    




    




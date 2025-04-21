from .models import *
from .serializers import *
from rest_framework import viewsets, permissions, generics
from rest_framework.parsers import MultiPartParser, FormParser
from django_filters.rest_framework import DjangoFilterBackend
from .filters import *
from .permissions import HoraPermission



class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CustomUserSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = UserFilter

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
    filter_backends = [DjangoFilterBackend]
    filterset_class = MedicoFilter
    
class MedicoIdNombreViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.filter(tipo_usuario="medico")
    serializer_class = MedicoIdNombre
    permission_classes = [permissions.AllowAny]

class EspecialidadViewSet(viewsets.ModelViewSet):
    queryset = Especialidad.objects.all()
    serializer_class = EspecialidadSerializer
    permission_classes = [permissions.AllowAny]
    
class HoraDisponibleViewSet(viewsets.ModelViewSet):
    queryset = HoraDisponible.objects.all()
    serializer_class = HoraDisponibleSerializer
    permission_classes = [HoraPermission]
    filterset_class = HoraDisponibleFilter
    
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
    




    




from .models import *
from .serializers import *
from rest_framework import viewsets, permissions
from django_filters.rest_framework import DjangoFilterBackend
from .filters import *

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CustomUserSerializer
    
class PacienteViewSet(viewsets.ModelViewSet):
    queryset = Paciente.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = PacienteSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = PacienteFilter
    
    
class MedicoViewSet(viewsets.ModelViewSet):
    queryset = Medico.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = MedicoSerializer
    
class EspecialidadViewSet(viewsets.ModelViewSet):
    queryset = Especialidad.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = EspecialidadSerializer
    
class CitasMedicasViewSet(viewsets.ModelViewSet):
    queryset = CitasMedicas.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CitasMedicasSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = CitasMedicasFilter
    
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
    




    




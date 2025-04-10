from rest_framework import routers
from .api import *
from django.urls import path
from .views import homeView

router = routers.DefaultRouter()

router.register('api/usuarios', CustomUserViewSet, 'Administradores')
router.register('api/pacientes', PacienteViewSet, 'Pacientes')
router.register('api/medicos', MedicoViewSet, 'Médicos')
router.register('api/especialidades', EspecialidadViewSet, 'Especialidades')
router.register('api/citas_medicas', CitasMedicasViewSet, 'Citas Médicas')
router.register('api/regiones', RegionViewSet, 'Regiones')
router.register('api/ciudades', CiudadViewSet, 'Ciudades')
router.register('api/comunas', ComunaViewSet, 'Comunas')
router.register('api/previsiones', PrevisionViewSet, 'Previsiones')

urlpatterns = router.urls + [
    path('home/', homeView, name="home")
]
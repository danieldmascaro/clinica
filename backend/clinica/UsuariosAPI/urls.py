from rest_framework import routers
from .api import *
from django.urls import path
from .views import homeView, get_csrf_token, get_tipo_usuario

router = routers.DefaultRouter()

router.register('api/usuarios', CustomUserViewSet, 'Administradores')
router.register('api/medicos', MedicoViewSet, 'Medicos')
router.register('api/especialidad', EspecialidadViewSet, 'Especialidad')
router.register('api/regiones', RegionViewSet, 'Regiones')
router.register('api/ciudades', CiudadViewSet, 'Ciudades')
router.register('api/comunas', ComunaViewSet, 'Comunas')
router.register('api/previsiones', PrevisionViewSet, 'Previsiones')

urlpatterns = router.urls + [
    path('home/', homeView, name="home"),
    path("api/registro-pacientes/", RegistrarPacienteViewSet.as_view(), name="registrar-pacientes"),
    path("api/registro-medicos/", RegistrarMedicoViewSet.as_view(), name="registrar-pacientes"),
    path('api/csrf-token/', get_csrf_token, name="registrar-token"),
    path("api/get-tipo-usuario/", get_tipo_usuario),
]
from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(CustomUser)
admin.site.register(PerfilMedico)
admin.site.register(PerfilPaciente)
admin.site.register(Cita)


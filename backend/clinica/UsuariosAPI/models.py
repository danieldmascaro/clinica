from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.db import models

class CustomUserManager(BaseUserManager):
    def master_create_user(self, rut, password, **extra_fields):
        if not rut:
            raise ValueError("El RUT es obligatorio")
        user = self.model(rut=rut, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_user(self, rut, password, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self.master_create_user(rut, password, **extra_fields)

    def create_superuser(self, rut,password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.master_create_user(rut, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):    
    USER_TYPE_CHOICES = (
        ("admin", "Administrador"),
        ("paciente", "Paciente"),
        ("medico", "Médico"),
    )
    rut = models.CharField(max_length=12, unique=True)
    genero = models.CharField(max_length=10, choices=[("M", "Masculino"), ("F", "Femenino"), ("O", "Otro")])
    fecha_nacimiento = models.DateField(auto_now=False, auto_now_add=False)
    nombres = models.CharField(max_length=100)
    primer_apellido = models.CharField(max_length=50)
    segundo_apellido = models.CharField(max_length=50)
    email = models.EmailField(max_length=254, unique=True)
    telefono = models.CharField(max_length=50)
    region = models.ForeignKey("Region", verbose_name=_("UsuarioRegion"), on_delete=models.SET_NULL, null=True, blank=True)
    ciudad = models.ForeignKey("Ciudad", verbose_name=_("UsuarioCiudad"), on_delete=models.SET_NULL, null=True, blank=True)
    comuna = models.ForeignKey("Comuna", verbose_name=_("UsuarioComuna"), on_delete=models.SET_NULL, null=True, blank=True)
    prevision = models.ForeignKey("Prevision", verbose_name=_("Previsión"), on_delete=models.SET_NULL, null=True, blank=True)
    fecha_registro = models.DateField(auto_now_add=True, blank=True, null=True)
    tipo_usuario = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)

    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["rut", "nombres", "primer_apellido", "segundo_apellido", "fecha_nacimiento", "genero"]
    

    def __str__(self):
        return f"{self.nombres} {self.primer_apellido} ({self.rut})"

class PerfilPaciente(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    historial_médico = models.TextField(blank=True, default=" ")   
    
    def __str__(self):
        return f"{self.user.nombres} {self.user.primer_apellido} ({self.user.rut})"     
        
class PerfilMedico(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to="medicos/", blank=True, null=True)
    fecha_ingreso = models.DateTimeField(null=True, blank=True)
    especialidad = models.ManyToManyField("Especialidad", related_name=("medicoEspecialidad"))
    
    def __str__(self):
        return f"{self.user.nombres} {self.user.primer_apellido} ({self.user.rut})"

class Especialidad(models.Model):
    nombre = models.CharField(max_length=50) 
    
    def __str__(self):
        return f"{self.nombre}"
         

class Region(models.Model):
    nombre = models.CharField(max_length=100)
    numero = models.PositiveIntegerField()
    
    def __str__(self):
        return f"{self.numero} {self.nombre}"

class Ciudad(models.Model):
    nombre = models.CharField(max_length=100)
    region = models.ForeignKey("Region", verbose_name=_("CiudadRegion"), on_delete=models.CASCADE)
    
    def __str__(self):
        return self.nombre
    
class Comuna(models.Model):
    nombre = models.CharField(max_length=100)
    ciudad = models.ForeignKey("Ciudad", verbose_name=_("ComunaCiudad"), on_delete=models.CASCADE)
    
    def __str__(self):
        return self.nombre
    
class Prevision(models.Model):
    nombre = models.CharField(max_length=100)
    tipo = models.CharField(max_length=50)
    
    def __str__(self):
        return f"{self.tipo} {self.nombre}"

class Cita(models.Model):
    ESTADO_CHOICES = (
        ('P', 'pendiente'),
        ('C', 'cancelada'),
        ('A', 'ausente'),
        ('R', 'realizada'),
        )
    
    paciente = models.ForeignKey("PerfilPaciente", on_delete=models.CASCADE)
    medico = models.ForeignKey("PerfilMedico", on_delete=models.CASCADE)
    estado = models.CharField(max_length=10, choices=ESTADO_CHOICES)
    
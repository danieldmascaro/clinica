from rest_framework import serializers
from .models import *
from djoser import utils
from djoser.serializers import UserCreateSerializer
from djoser.email import ActivationEmail
from djoser.conf import settings
from django.contrib.auth.tokens import default_token_generator


class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    is_superuser = serializers.BooleanField(read_only=True)
    is_verified = serializers.BooleanField(read_only=True)
    class Meta:
        model = CustomUser
        exclude = ['is_staff']
        
    def create(self, validated_data):
        password = validated_data.pop('password')  # Extraer la contraseña
        user = super().create(validated_data)  # Crear el usuario sin la contraseña
        user.set_password(password)  # Cifrar la contraseña
        user.save()  # Guardar el usuario
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)  # Si se proporciona una nueva contraseña
        user = super().update(instance, validated_data)
        if password:
            user.set_password(password)  # Cifrar la nueva contraseña
            user.save()  # Guardar el usuario actualizado
        return user
    
class CustomPacienteRegisterSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = CustomUser
        fields = UserCreateSerializer.Meta.fields + (
            "rut",
            "email",
            "nombres",
            "primer_apellido",
            "segundo_apellido",
            "fecha_nacimiento",
            "genero",
            "telefono",
            "region",
            "ciudad",
            "comuna",
            "prevision",
        )

    def create(self, validated_data):
        # Forzamos tipo_usuario = "paciente"
        validated_data["tipo_usuario"] = "paciente"

        user = super().create(validated_data)
        PerfilPaciente.objects.create(user=user, historial_médico=" ")

       # Enviar correo de activación si está activado en settings
        request = self.context.get("request")
        if settings.SEND_ACTIVATION_EMAIL and request:
            context = {
                "user": user,
                "request": request,
                "token": default_token_generator.make_token(user),
                "uid": utils.encode_uid(user.pk),
            }

            # Este paso es clave: la clase ActivationEmail espera un `context` con una request válida
            activation_email = ActivationEmail(context={"user": user, "request": request})
            activation_email.send([user.email])

        return user        

class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = "__all__"
        
class CiudadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ciudad
        fields = "__all__"
        
class ComunaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comuna
        fields = "__all__"
        
class PrevisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prevision
        fields = "__all__"
        

    
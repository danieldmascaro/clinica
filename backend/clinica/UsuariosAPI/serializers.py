from rest_framework import serializers
from .models import *

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    is_superuser = serializers.BooleanField(read_only=True)
    is_verified = serializers.BooleanField(read_only=True)
    class Meta:
        model = CustomUser
        exclude = ['is_staff', 'last_login']
        
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

class PacienteSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    is_superuser = serializers.BooleanField(read_only=True)
    class Meta:
        model = Paciente
        exclude = ['is_staff', 'last_login']
        
class MedicoSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    especialidad = serializers.SlugRelatedField(slug_field='nombre', read_only=True, many=True)
    is_superuser = serializers.BooleanField(read_only=True)
    class Meta:
        model = Medico
        exclude = [ 'is_staff', 'last_login']
        
class EspecialidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especialidad
        fields = "__all__"

class CitasMedicasSerializer(serializers.ModelSerializer):
    class Meta:
        model = CitasMedicas
        fields = "__all__"

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
        

    
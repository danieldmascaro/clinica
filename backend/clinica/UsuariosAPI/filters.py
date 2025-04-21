from .models import CustomUser, HoraDisponible
import django_filters

class UserFilter(django_filters.FilterSet):
    nombres = django_filters.CharFilter(lookup_expr='icontains')
    primer_apellido = django_filters.CharFilter(lookup_expr='icontains')
    class Meta:
        model = CustomUser
        fields = []
        
class MedicoFilter(django_filters.FilterSet):
    especialidad = django_filters.BaseInFilter(field_name="perfilmedico__especialidad__id")

    class Meta:
        model = CustomUser
        fields = ['especialidad', "id"]
        
class HoraDisponibleFilter(django_filters.FilterSet):
    medico = django_filters.NumberFilter(field_name="medico", lookup_expr='exact')

    class Meta:
        model = HoraDisponible
        fields = ['medico']
    
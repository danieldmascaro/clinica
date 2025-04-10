import django_filters
from django.db.models import Q
from django.forms import DateInput
from .models import *


class PacienteFilter(django_filters.FilterSet):
    nombres = django_filters.CharFilter(lookup_expr="icontains")
    edad = django_filters.NumberFilter(lookup_expr="gte")
    fecha_registro_inicio = django_filters.DateFilter(
        field_name='fecha_registro', lookup_expr='gte', 
        label="Fecha desde", widget=DateInput(attrs={'type': 'date'})
    )
    fecha_registro_fin = django_filters.DateFilter(
        field_name='fecha_registro', lookup_expr='lte', 
        label="Fecha hasta", widget=DateInput(attrs={'type': 'date'})
    )

    class Meta:
        model = Paciente
        fields = ["nombres", "edad", "fecha_registro_inicio", "fecha_registro_fin"]

class CitasMedicasFilter(django_filters.FilterSet):
    fechaCita = django_filters.DateFromToRangeFilter()
    persona = django_filters.CharFilter(method="filter_persona")
    
    class Meta:
        model = CitasMedicas
        fields = ["estadoCita", "fechaCita", "persona"]

    def filter_persona(self, queryset, name, value):
        return queryset.filter(
            Q(medico__nombres__icontains=value) | Q(medico__primer_apellido__icontains=value) |
            Q(paciente__nombres__icontains=value) | Q(paciente__primer_apellido__icontains=value)
        )
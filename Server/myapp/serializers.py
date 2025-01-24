from rest_framework import serializers
from .models import EmpleadosResguardantes
from .models import EmpleadoResguardante

class EmpleadosResguardantesSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmpleadosResguardantes
        fields = '__all__'



class EmpleadoResguardanteSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmpleadoResguardante
        fields = '__all__'
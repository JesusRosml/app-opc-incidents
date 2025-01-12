from rest_framework import serializers
from .models import EmpleadosResguardantes

class EmpleadosResguardantesSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmpleadosResguardantes
        fields = '__all__'
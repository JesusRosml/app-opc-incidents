from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import EmpleadosResguardantes  # Asegúrate de importar el modelo
from .serializers import EmpleadosResguardantesSerializer

# Create your views here.
@api_view(['GET'])
def auth_view(request):
    return Response({ 'funciona': True })

@api_view(['GET'])
def empleados_resguardantes_view(request):
    empleados = EmpleadosResguardantes.objects.all()
    serializer = EmpleadosResguardantesSerializer(empleados, many=True)
    return Response(serializer.data)
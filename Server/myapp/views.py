from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import EmpleadosResguardantes,Usuarios #importar modelos
from .serializers import EmpleadosResguardantesSerializer
from django.contrib.auth.hashers import check_password
from .models import EmpleadosResguardantes, Usuarios
from .models import EmpleadoResguardante
from .serializers import EmpleadoResguardanteSerializer
import bcrypt


# Create your views here.
#@api_view(['GET'])
#def auth_view(request):
#    return Response({ 'funciona': True })

@api_view(['GET'])
def empleados_resguardantes_view(request):
    empleados = EmpleadosResguardantes.objects.all()
    serializer = EmpleadosResguardantesSerializer(empleados, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def auth_view(request):
    email = request.data.get('email')
    password = request.data.get('password').encode('utf-8')  
    
    try:
        user = Usuarios.objects.get(correo_electronico=email)
        stored_password = user.Contraseña.encode('utf-8')  
        
        
        if bcrypt.checkpw(password, stored_password):
            user_data = {
                'User_id': user.User_id,
                'Nombre': user.Nombre,
                'Primer_apellido': user.Primer_apellido,
                'Segundo_apellido': user.Segundo_apellido,
                'isadmin': user.Rol.Rol_id == 1,
                'correo_electronico': user.correo_electronico,
                'departamento': {
                    'id_departamento': user.departamento.id_departamento if user.departamento else None,
                    'nombre_departamento': user.departamento.nombre_departamento if user.departamento else None
                }
                
            }
            return Response({
                'message': 'Usuario autentificado',
                'authentication': True,
                'user': user_data
            })
        else:
            return Response({
                'message': 'Contraseña incorrecta',
                'authentication': False
            })
    except Usuarios.DoesNotExist:
        return Response({
            'message': 'Usuario no encontrado',
            'authentication': False
        })

@api_view(['POST'])
def buscar_empleados(request):
    query = request.data.get('nameCompleted', '')
    empleados = EmpleadoResguardante.objects.filter(Nombre__icontains=query)
    serializer = EmpleadoResguardanteSerializer(empleados, many=True)
    return Response(serializer.data)
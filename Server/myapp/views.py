from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import EmpleadosResguardantes, Usuarios, Obra, Empresa, Frente
from .serializers import EmpleadosResguardantesSerializer
from django.contrib.auth.hashers import check_password
import bcrypt

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
    empleados = EmpleadosResguardantes.objects.filter(Nombre__icontains=query)
    
    if not empleados.exists():
        return Response({'message': 'El usuario no existe'}, status=404)
    
    empleados_data = []
    for empleado in empleados:
        obra = Obra.objects.get(Obra_id=empleado.Obra_id)
        empresa = Empresa.objects.get(Empresa_id=empleado.Empresa_id)
        frente = Frente.objects.get(Frente_id=empleado.id_frente)
        empleados_data.append({
            'Empleado_id': empleado.Empleado_id,
            'Nombre': empleado.Nombre,
            'Primer_apellido': empleado.Primer_apellido,
            'Segundo_apellido': empleado.Segundo_apellido,
            'Correo_electronico': empleado.Correo_electronico,
            'Numero_obra': obra.Num_obra,
            'Nombre_obra': obra.Nombre_obra,
            'Empresa_id': empresa.Empresa_id,
            'Nom_empresa': empresa.Nom_empresa,
            'Nom_corto': empresa.Nom_corto,
            'id_frente': empleado.id_frente,
            'Nom_frente': frente.Nom_frente,
            'numero_frente': frente.numero_frente
        })
    
    return Response(empleados_data)
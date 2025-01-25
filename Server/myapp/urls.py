from django.urls import path
from .views import auth_view, empleados_resguardantes_view
from .views import buscar_empleados

urlpatterns = [
    path('auth/', auth_view, name='auth'),
    path('empleados_resguardantes/', empleados_resguardantes_view, name='empleados_resguardantes'),
]

urlpatterns = [
    path('buscar_empleados/', buscar_empleados, name='buscar_empleados'),
]
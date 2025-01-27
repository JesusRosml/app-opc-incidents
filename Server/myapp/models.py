from django.db import models

# Create your models here.

from django.db import models

class EmpleadosResguardantes(models.Model):
    Empleado_id = models.AutoField(primary_key=True)
    Nombre = models.CharField(max_length=45)
    Primer_apellido = models.CharField(max_length=45)
    Segundo_apellido = models.CharField(max_length=45)
    Empresa_id = models.IntegerField()
    Obra_id = models.IntegerField()
    Correo_electronico = models.CharField(max_length=45)
    id_frente = models.IntegerField()

    class Meta:
        db_table = 'empleados_resguardantes'

    def __str__(self):
        return self.Nombre

class Roles(models.Model):
    Rol_id = models.AutoField(primary_key=True)
    Nombre_rol = models.CharField(max_length=100, unique=True)

    class Meta:
        db_table = 'roles'

    def __str__(self):
        return self.Nombre_rol

class Departamento(models.Model):
    id_departamento = models.AutoField(primary_key=True)
    nombre_departamento = models.CharField(max_length=255, unique=True)

    class Meta:
        db_table = 'departamento'

    def __str__(self):
        return self.nombre_departamento

class Usuarios(models.Model):
    User_id = models.AutoField(primary_key=True)
    Nombre = models.CharField(max_length=100)
    Primer_apellido = models.CharField(max_length=100)
    Segundo_apellido = models.CharField(max_length=100)
    Contraseña = models.CharField(max_length=255)
    Rol = models.ForeignKey(Roles, on_delete=models.CASCADE)
    correo_electronico = models.CharField(max_length=255, unique=True)
    departamento = models.ForeignKey(Departamento, on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        db_table = 'usuarios'

    def __str__(self):
        return self.Nombre


class Empresa(models.Model):
    Empresa_id = models.AutoField(primary_key=True)
    Nom_empresa = models.CharField(max_length=255)
    Nom_corto = models.CharField(max_length=50)

    class Meta:
        db_table = 'empresas'

class Obra(models.Model):
    Obra_id = models.AutoField(primary_key=True)
    Nombre_obra = models.CharField(max_length=255)
    Nom_corto_obra = models.CharField(max_length=50)
    Num_obra = models.CharField(max_length=20)

    class Meta:
        db_table = 'obras'

class Frente(models.Model):
    Frente_id = models.AutoField(primary_key=True)
    Nom_frente = models.CharField(max_length=255)
    numero_frente = models.IntegerField(null=True)

    class Meta:
        db_table = 'frente'


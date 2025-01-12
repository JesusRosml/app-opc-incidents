from django.db import models

# Create your models here.

class EmpleadosResguardantes( models.Model ):
    Empleado_id = models.AutoField(primary_key=True)
    Nombre = models.CharField(max_length=45)
    Primer_apellido = models.CharField(max_length=45)
    Segundo_apellido = models.CharField(max_length=45)
    Num_seguro_social = models.CharField(max_length=45)
    Empresa_id = models.IntegerField()
    Obra_id = models.IntegerField()
    Correo_electronico = models.CharField(max_length=45)
    id_frente = models.IntegerField()

    class Meta:
        db_table = 'empleados_resguardantes'

    def __str__(self):
        return self.Nombre

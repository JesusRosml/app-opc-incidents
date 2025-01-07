from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class UsuarioManager(BaseUserManager):
    def create_user(self, correo_electronico, password=None, **extra_fields):
        if not correo_electronico:
            raise ValueError('El correo electrónico debe ser proporcionado')
        correo_electronico = self.normalize_email(correo_electronico)
        user = self.model(correo_electronico=correo_electronico, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, correo_electronico, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(correo_electronico, password, **extra_fields)

class Usuario(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True, db_column='User_id')
    nombre = models.CharField(max_length=100, db_column='Nombre')
    primer_apellido = models.CharField(max_length=100, db_column='Primer_apellido')
    segundo_apellido = models.CharField(max_length=100, db_column='Segundo_apellido')
    password = models.CharField(max_length=255, db_column='Contraseña')
    rol_id = models.IntegerField(db_column='Rol_id')
    correo_electronico = models.EmailField(unique=True, db_column='correo_electronico')
    departamento_id = models.IntegerField(null=True, blank=True, db_column='departamento_id')

    objects = UsuarioManager()

    USERNAME_FIELD = 'correo_electronico'
    REQUIRED_FIELDS = ['nombre', 'primer_apellido', 'segundo_apellido']

    class Meta:
        db_table = 'usuarios'
# Generated by Django 5.2 on 2025-04-09 17:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('UsuariosAPI', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='email',
            field=models.EmailField(max_length=254, unique=True),
        ),
    ]

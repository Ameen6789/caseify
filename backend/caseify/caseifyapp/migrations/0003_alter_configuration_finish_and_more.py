# Generated by Django 5.1.2 on 2024-10-13 14:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('caseifyapp', '0002_configuration_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='configuration',
            name='finish',
            field=models.CharField(blank=True, choices=[('smooth', 'Smooth Finish'), ('textured', 'Texture Finish')], max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='configuration',
            name='material',
            field=models.CharField(blank=True, choices=[('silicone', 'Silicone'), ('polycarbonate', 'Soft Polycarbonate')], max_length=30, null=True),
        ),
    ]

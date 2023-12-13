# Generated by Django 4.2.6 on 2023-11-16 19:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CourseModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='Name of the course', max_length=255, unique=True)),
                ('code', models.CharField(help_text='Code/Identifier for the course', max_length=10, unique=True)),
                ('description', models.TextField(blank=True, help_text='Description of the course', null=True)),
                ('credits', models.PositiveIntegerField(default=3, help_text='Number of credits for the course')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='ExamModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='Name of the exam', max_length=255, unique=True)),
                ('description', models.TextField(blank=True, help_text='Description of the exam', null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='SubjectModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='Name of the subject', max_length=255, unique=True)),
                ('code', models.CharField(help_text='Code/Identifier for the subject', max_length=10, unique=True)),
                ('description', models.TextField(blank=True, help_text='Description of the subject', null=True)),
                ('credits', models.PositiveIntegerField(default=3, help_text='Number of credits for the subject')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='subjects', to='ExamApp.coursemodel')),
            ],
        ),
        migrations.CreateModel(
            name='NotesModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(help_text='Title of the notes', max_length=255)),
                ('content', models.TextField(help_text='Content of the notes')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('subject', models.ForeignKey(help_text='Subject related to the notes', on_delete=django.db.models.deletion.CASCADE, related_name='notes', to='ExamApp.subjectmodel')),
            ],
        ),
        migrations.AddField(
            model_name='coursemodel',
            name='exam',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='courses', to='ExamApp.exammodel'),
        ),
    ]

from django.contrib import admin
from .models import ExamSectionModel, CommissionModel, ExamModel, NotificationModel, SubjectModel, CategorisationModel, \
    ChapterModel, NotesModel, TitleImage,BulletsPoint


class ExamSectionAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'abbreviation')
    search_fields = ['name', 'abbreviation']


class CommissionAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')
    search_fields = ['name']


class ExamAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'abbreviation', 'description', 'created_at', 'updated_at', 'commission')
    search_fields = ['name', 'description']
    list_filter = ['commission']
    date_hierarchy = 'created_at'


class NotificationAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'name', 'Year', 'date', 'description', 'credits', 'official_notification', 'created_at', 'updated_at',
        'exam')
    search_fields = ['name', 'Year', 'description']
    list_filter = ['exam']
    date_hierarchy = 'date'


class SubjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'abbreviation', 'description', 'exam', 'created_at', 'updated_at')
    search_fields = ['name', 'abbreviation', 'description']
    list_filter = ['exam']


class CategorisationAdmin(admin.ModelAdmin):
    list_display = ('id', 'Category', 'created_at', 'updated_at', 'subject')
    search_fields = ['Category']
    list_filter = ['subject']


class ChapterAdmin(admin.ModelAdmin):
    list_display = ('id', 'chapterName', 'created_at', 'updated_at', 'category')
    search_fields = ['chapter_name']
    list_filter = ['category']


class TitleImageAdmin(admin.ModelAdmin):
    list_display = ['id', 'image', 'caption']


class NotesAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'content', 'chapter', 'title_image', 'created_at', 'updated_at')
    search_fields = ['title', 'content']
    list_filter = ['chapter', 'tags', 'chapter__category__subject']
    date_hierarchy = 'created_at'


class BulltesAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'content', 'chapter', 'created_at', 'updated_at')
    search_fields = ['title', 'content']
    list_filter = ['chapter', 'tags', ]
    date_hierarchy = 'created_at'


# Register your models with the custom admin classes
admin.site.register(ExamSectionModel, ExamSectionAdmin)
admin.site.register(CommissionModel, CommissionAdmin)
admin.site.register(ExamModel, ExamAdmin)
admin.site.register(NotificationModel, NotificationAdmin)
admin.site.register(SubjectModel, SubjectAdmin)
admin.site.register(CategorisationModel, CategorisationAdmin)
admin.site.register(ChapterModel, ChapterAdmin)
admin.site.register(NotesModel, NotesAdmin)
admin.site.register(TitleImage, TitleImageAdmin)
admin.site.register(BulletsPoint,BulltesAdmin)

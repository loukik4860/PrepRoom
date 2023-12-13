from django.db import models
from blogApp.models import Tag


class TitleImage(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    image = models.ImageField(upload_to='ExamApp_TitleImages/', null=True, blank=True)
    caption = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    def __str__(self):
        if self.caption:
            return f"{self.id}--{self.name}"
        else:
            return f"{self.id}"


class ExamSectionModel(models.Model):
    name = models.CharField(max_length=200, unique=True, blank=True, null=True)
    abbreviation = models.CharField(max_length=100, unique=True, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    def __str__(self):
        return f"{self.name}"


class CommissionModel(models.Model):
    name = models.CharField(max_length=200, unique=True)
    description = models.TextField(blank=True, null=True)
    examSection = models.ForeignKey(ExamSectionModel, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f"{self.name}"


class ExamModel(models.Model):
    name = models.CharField(max_length=255, unique=True)
    abbreviation = models.CharField(max_length=100, unique=True, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)
    commission = models.ForeignKey(CommissionModel, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f"{self.name}"


class NotificationModel(models.Model):
    name = models.CharField(max_length=255, unique=True)
    Year = models.CharField(max_length=10, unique=True)
    date = models.DateTimeField()
    description = models.TextField(blank=True, null=True)
    credits = models.PositiveIntegerField(default=3, blank=True, null=True)
    official_notification = models.FileField(upload_to="Files/Notification")
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)
    exam = models.ForeignKey(ExamModel, on_delete=models.CASCADE, related_name="courses", blank=True, null=True)

    def __str__(self):
        return f"{self.name}"


class SubjectModel(models.Model):
    name = models.CharField(max_length=255, unique=True)
    abbreviation = models.CharField(max_length=100, unique=True, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)
    exam = models.ForeignKey(ExamModel, on_delete=models.CASCADE, related_name="subjects", blank=True, null=True)

    def __str__(self):
        return f"{self.name}"


class CategorisationModel(models.Model):
    Category = models.CharField(max_length=200, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)
    subject = models.ForeignKey(SubjectModel, on_delete=models.CASCADE, related_name='category', blank=True, null=True)

    def __str__(self):
        return f"{self.Category}"


class ChapterModel(models.Model):
    chapterName = models.CharField(max_length=200, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)
    category = models.ForeignKey(CategorisationModel, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f"{self.chapterName}"


class NotesModel(models.Model):
    title = models.CharField(max_length=255, blank=True, null=True)
    content = models.TextField(blank=True, null=True)
    chapter = models.ForeignKey(ChapterModel, on_delete=models.CASCADE, related_name='note', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)
    tags = models.ManyToManyField(Tag, blank=True)
    title_image = models.OneToOneField(TitleImage, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f"{self.title}"


class BulletsPoint(models.Model):
    title = models.CharField(max_length=200, blank=True, null=True)
    content = models.TextField(blank=True, null=True)
    chapter = models.ForeignKey(ChapterModel, on_delete=models.CASCADE, related_name='bullets', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)
    tags = models.ManyToManyField(Tag, blank=True)

    def __str__(self):
        return f"{self.title}"
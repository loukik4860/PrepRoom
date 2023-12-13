from rest_framework import serializers
from .models import ExamSectionModel, CommissionModel, ExamModel, NotificationModel, SubjectModel, NotesModel, \
    CategorisationModel, ChapterModel, TitleImage, BulletsPoint
from blogApp.serializers import TagSerializer


class ExamSectionSerializer(serializers.ModelSerializer):  # Done
    class Meta:
        model = ExamSectionModel
        fields = ['id', 'name', 'abbreviation']

    def create(self, validated_data):
        return ExamSectionModel.objects.create(**validated_data)


class CommissionSerializer(serializers.ModelSerializer):  # Done
    exam = ExamSectionSerializer(source='examSection', read_only=True)

    class Meta:
        model = CommissionModel
        fields = ['id', 'name', 'description', 'examSection', 'exam']

    def create(self, validated_data):
        return CommissionModel.objects.create(**validated_data)


class ExamSerializer(serializers.ModelSerializer):
    commissionRelated = CommissionSerializer(source='commission', read_only=True)

    class Meta:
        model = ExamModel
        fields = ['id', 'name', 'abbreviation', 'description', 'created_at', 'updated_at', 'commission',
                  'commissionRelated']


class NotificationSerializer(serializers.ModelSerializer):
    examRelated = ExamSerializer(source='exam', read_only=True)

    class Meta:
        model = NotificationModel
        fields = ['id', 'name', 'Year', 'date', 'description', 'credits', 'official_notification', 'created_at',
                  'updated_at',
                  'exam', 'examRelated']


class SubjectSerializer(serializers.ModelSerializer):
    examRelated = ExamSerializer(source='exam', read_only=True)

    class Meta:
        model = SubjectModel
        fields = ['id', 'name', 'abbreviation', 'description', 'created_at', 'updated_at', 'exam', 'examRelated']


class CategorisationSerializer(serializers.ModelSerializer):
    Related_Subject = SubjectSerializer(source='subject', read_only=True)

    class Meta:
        model = CategorisationModel
        fields = ['id', 'Category', 'created_at', 'updated_at', 'subject', 'Related_Subject']


class ChapterSerializer(serializers.ModelSerializer):
    Related_category = CategorisationSerializer(source='category', read_only=True)

    class Meta:
        model = ChapterModel
        fields = ['id', 'chapterName', 'created_at', 'updated_at', 'category', 'Related_category']


class TitleImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TitleImage
        fields = ['id', 'name', 'image', 'caption', 'created_at', 'updated_at']


class NotesSerializer(serializers.ModelSerializer):
    chapterRelated = ChapterSerializer(source='chapter', read_only=True)
    Tags = TagSerializer(source="tags", many=True, read_only=True)
    Title_image = TitleImageSerializer(source='title_image', read_only=True)

    class Meta:
        model = NotesModel
        fields = ['id', 'title', 'content', 'chapter', 'created_at', 'updated_at', 'tags', 'Tags', 'title_image',
                  'Title_image', 'chapterRelated', ]

    def create(self, validated_data):
        tags_data = validated_data.pop('tags', None)  # Pop tags from validated_data

        # Create the NotesModel instance without tags
        notes_instance = NotesModel.objects.create(**validated_data)

        if tags_data:
            notes_instance.tags.set(tags_data)  # Use set() to assign tags to the many-to-many field

        return notes_instance


# class ExamSerializer(serializers.ModelSerializer):
#     commission = CommissionSerializer(read_only=True)
#     exam = ExamSectionSerializer(many=True, read_only=True)
#     subject = SubjectSerializer(many=True, read_only=True)
#     category = CategorisationSerializer(many=True, read_only=True)
#     chapter = ChapterSerializer(many=True, read_only=True)
#     notes = NotesSerializer(many=True, read_only=True)
#
#     class Meta:
#         model = ExamSectionModel
#         fields = ['id', 'name', 'abbreviation', 'commission', 'exam', 'subject', 'category', 'chapter', 'notes']


class NotesBySubject(serializers.ModelSerializer):
    notes = NotesSerializer(many=True)
    title_image = TitleImageSerializer()

    class Meta:
        model = SubjectModel
        fields = ['id', 'name', 'abbreviation', 'description', 'created_at', 'updated_at', 'notes', 'title_image']


class TitleImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TitleImage
        fields = ['id', 'name', 'image', 'caption', 'created_at', 'updated_at']


class BulletsPointSerializer(serializers.ModelSerializer):
    Tag = TagSerializer(source="tags", many=True, read_only=True)
    Chapter = ChapterSerializer(source='chapter', many=True, read_only=True)

    class Meta:
        model = BulletsPoint
        fields = ['id', 'title', 'content', 'chapter', 'created_at', 'updated_at', 'tags', 'Tag', 'Chapter']

    def create(self, validated_data):
        return BulletsPoint.objects.create(**validated_data)

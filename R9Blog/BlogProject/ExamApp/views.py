from rest_framework import views
from .serializers import ExamSectionSerializer, CommissionSerializer, ExamSerializer, NotificationSerializer, \
    SubjectSerializer, NotesSerializer, CategorisationSerializer, ChapterSerializer, ExamSerializer, NotesBySubject, \
    TitleImageSerializer, BulletsPointSerializer
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView
from .models import ExamSectionModel, CommissionModel, ExamModel, NotificationModel, SubjectModel, NotesModel, \
    CategorisationModel, ChapterModel, TitleImage, BulletsPoint
from rest_framework.response import Response
from rest_framework import status


class TitleImageList(ListAPIView):
    queryset = TitleImage.objects.all()
    serializer_class = TitleImageSerializer


class TitleImageCreate(CreateAPIView):
    queryset = TitleImage.objects.all()
    serializer_class = TitleImageSerializer


class ExamSectionView(ListAPIView):
    queryset = ExamSectionModel.objects.all()
    serializer_class = ExamSectionSerializer


class ExamSectionCreateView(CreateAPIView):
    queryset = ExamSectionModel.objects.all()
    serializer_class = ExamSectionSerializer


# --------------EXAM SECTION--------------------

# --------------COMMISSION--------------------
class CommissionListView(ListAPIView):
    queryset = CommissionModel.objects.all()
    serializer_class = CommissionSerializer


class CommissionCreateView(CreateAPIView):
    queryset = CommissionModel.objects.all()
    serializer_class = CommissionSerializer


class CommissionByExamSection(ListAPIView):
    queryset = CommissionModel.objects.all()
    serializer_class = CommissionSerializer

    def get_queryset(self):
        commission_id = self.kwargs['pk']
        print(commission_id)
        return CommissionModel.objects.filter(examSection__id=commission_id)


# --------------COMMISSION--------------------

# --------------EXAM--------------------

class ExamListView(ListAPIView):
    queryset = ExamModel.objects.all()
    serializer_class = ExamSerializer


class ExamCreateView(CreateAPIView):
    queryset = ExamModel.objects.all()
    serializer_class = ExamSerializer


class ExamListByCommission(ListAPIView):
    serializer_class = ExamSerializer

    def get_queryset(self):
        commission_id = self.kwargs['pk']
        return ExamModel.objects.filter(commission__id=commission_id)


# --------------EXAM--------------------

class NotificationListView(ListAPIView):
    queryset = NotificationModel.objects.all()
    serializer_class = NotificationSerializer


class NotificationCreateView(CreateAPIView):
    queryset = NotificationModel.objects.all()
    serializer_class = NotificationSerializer


# --------------NOTIFICATION--------------------

class SubjectListView(ListAPIView):
    queryset = SubjectModel.objects.all()
    serializer_class = SubjectSerializer


class SubjectCreateView(CreateAPIView):
    queryset = SubjectModel.objects.all()
    serializer_class = SubjectSerializer


class SubjectRetrieveView(RetrieveAPIView):
    queryset = SubjectModel.objects.all()
    serializer_class = SubjectSerializer


# --------------SUBJECT--------------------

class CategorisationListView(ListAPIView):
    queryset = CategorisationModel.objects.all()
    serializer_class = CategorisationSerializer


class CategorisationCreateView(CreateAPIView):
    queryset = CategorisationModel.objects.all()
    serializer_class = CategorisationSerializer


class CategorisationRetrieveView(ListAPIView):
    serializer_class = CategorisationSerializer
    lookup_field = 'subject_name'

    def get_queryset(self):
        subject_name = self.kwargs['subject_name']
        return CategorisationModel.objects.filter(subject__name=subject_name)


# --------------CATEGORY--------------------
class ChapterListView(ListAPIView):
    queryset = ChapterModel.objects.all()
    serializer_class = ChapterSerializer


class ChapterCreateView(CreateAPIView):
    queryset = ChapterModel.objects.all()
    serializer_class = ChapterSerializer


class ChapterRetrieveView(RetrieveAPIView):
    queryset = ChapterModel.objects.all()
    serializer_class = ChapterSerializer


class ChapterCategoryView(ListAPIView):
    serializer_class = ChapterSerializer
    lookup_field = 'category_id'

    def get_queryset(self):
        category_id = self.kwargs['category_id']
        return ChapterModel.objects.filter(category_id=category_id)


# ----------------------------------------CHAPTER-----------------------------------

class NotesListViews(ListAPIView):
    queryset = NotesModel.objects.all()
    serializer_class = NotesSerializer


class NotesCreateViews(CreateAPIView):
    queryset = NotesModel.objects.all()
    serializer_class = NotesSerializer


class NotesByTagsView(ListAPIView):
    serializer_class = NotesSerializer

    def get_queryset(self):
        tags_id = self.kwargs['tags_id']
        return NotesModel.objects.filter(tags__id=tags_id)


class NotesBySubjectView(ListAPIView):
    serializer_class = NotesSerializer

    def get_queryset(self):
        subject_id = self.kwargs['subject_id']
        return NotesModel.objects.filter(chapter__category__subject_id=subject_id)


class NotesByChapterView(ListAPIView):
    serializer_class = NotesSerializer

    def get_queryset(self):
        chapter_id = self.kwargs['chapter_id']
        return NotesModel.objects.filter(chapter__id=chapter_id)


class NoteRetrieveView(RetrieveAPIView):
    queryset = NotesModel.objects.all()
    serializer_class = NotesSerializer


# -----------------------------------------NOTES------------------------------------------------------

class SubjectPostsView(ListAPIView):
    serializer_class = NotesSerializer  # Use the appropriate serializer for your posts

    def get_queryset(self):
        subject_id = self.kwargs['id']
        print(subject_id)
        print(NotesModel.objects.filter(subject_id=subject_id))
        return NotesModel.objects.filter(subject_id=subject_id)


class SubjectNoteRetrieveView(RetrieveAPIView):
    serializer_class = NotesSerializer
    lookup_field = 'id'

    def get_object(self):
        subject_id = self.kwargs['subject_id']
        note_id = self.kwargs['note_id']
        subject = SubjectModel.objects.get(id=subject_id)
        note = NotesModel.objects.get(subject=subject, id=note_id)
        return note


class BulletsPointCreateView(CreateAPIView):
    queryset = BulletsPoint.objects.all()
    serializer_class = BulletsPointSerializer

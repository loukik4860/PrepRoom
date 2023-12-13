from django.urls import path
from .views import ExamSectionView,ExamSectionCreateView,CommissionListView,CommissionCreateView,ExamListView,ExamCreateView,NotificationListView,\
    NotificationCreateView, SubjectListView, SubjectCreateView, NotesListViews, NotesCreateViews, SubjectRetrieveView, \
    CategorisationListView,CategorisationCreateView,ChapterCreateView,ChapterListView, ChapterRetrieveView,CategorisationRetrieveView, \
    ChapterCategoryView,NotesByTagsView,NotesBySubjectView,NotesByChapterView,NoteRetrieveView,CommissionByExamSection,\
    TitleImageCreate,TitleImageList,BulletsPointCreateView,ExamListByCommission


urlpatterns = [
    path('examSectionList/', ExamSectionView.as_view(), name="ExamSection"), #Done
    path('examSectionCreate/', ExamSectionCreateView.as_view(), name="ExamSection"), #Done
    path('commissionList/', CommissionListView.as_view(), name="commissionList"), #Done
    path('commissionCreate/', CommissionCreateView.as_view(), name="commissionCreate"), #Done
    path('commissionExam/<int:pk>/', CommissionByExamSection.as_view(), name="commissionSection"), #Done
    path('examList/',ExamListView.as_view(),name="examList"),
    path('examCreate/',ExamCreateView.as_view(),name="examCreate"), #Done
    path('examCommission/<int:pk>/',ExamListByCommission.as_view(),name="exam_by_commission"),
    path('notificationList/',NotificationListView.as_view(),name="NotificationList"),
    path('notificationCreate/',NotificationCreateView.as_view(),name="NotificationCreate"),
    path('subjectList/',SubjectListView.as_view(),name="subjectList"),
    path('subjectList/<int:pk>/',SubjectRetrieveView.as_view(),name="subjectRetrieve"),
    path('subjectCreate/',SubjectCreateView.as_view(),name="subjectCreate"),
    path('categoryList/',CategorisationListView.as_view(),name="categoryList"),
    path('categoryList/<str:subject_name>/',CategorisationRetrieveView.as_view(),name="categoryRetrieve"),
    path('categoryCreate/',CategorisationCreateView.as_view(),name="categoryCreate"),
    path('ChapterList/',ChapterListView.as_view(),name="chapterList"),
    path('ChapterCreate/',ChapterCreateView.as_view(),name="chapterCreate"),
    path('ChapterRetrieve/<int:pk>/',ChapterRetrieveView.as_view(),name="chapterCreate"),
    path('ChapterCategory/<int:category_id>/',ChapterCategoryView.as_view(),name="chapterCategory"),
    path('notesCreate/',NotesCreateViews.as_view(),name="NotesCreate"),
    path("notesTags/<int:tags_id>/",NotesByTagsView.as_view(),name="NotesTags"),
    path('notesList/',NotesListViews.as_view(),name="NotesCreate"),
    path('note/<int:pk>/',NoteRetrieveView.as_view(),name="noteRetrieve"),
    path('noteSubject/<int:subject_id>/', NotesBySubjectView.as_view(), name="notesSub"),
    path('noteChapter/<int:chapter_id>/', NotesByChapterView.as_view(), name="notesChapter"),
    path('imageCreate/',TitleImageCreate.as_view(),name="ImageCreate"),
    path('imageList/',TitleImageList.as_view(),name="ImageList"),
    path('bulltesCreate/',BulletsPointCreateView.as_view(),name="bulletsCreate")
]
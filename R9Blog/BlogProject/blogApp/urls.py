from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import PostBlogImageView, PostBlogImageDetailsView, PostTagView, PostTagDetailsView, PostBlogView, \
    PostBlogDetailsView, AuthorPostView, AllAuthorDetailsWithBlogPost_blogImage_tags, \
    AuthorDetailsWithBlogPost_blogImage_tags, TagDetailsWithPost, SingleTagDetailsWithPost, SingleTagBySubject

urlpatterns = [
    path('postImage/', PostBlogImageView.as_view(), name="postImage"),  # shows all images
    path('postImage/<int:pk>/', PostBlogImageDetailsView.as_view(), name="postdetails"),  # Show specific image
    path('tagpost/', PostTagView.as_view(), name="postTag"),  #Show all Tag
    path('tagpost/<int:pk>/', PostTagDetailsView.as_view(), name="postTagDetails"),  # Show specific tag
    path('taglist/', TagDetailsWithPost.as_view(), name="tagList"),
    path('taglist/<int:id>/', SingleTagDetailsWithPost.as_view(), name="tag-details-with-posts"),
    path('tag/<str:name>/', SingleTagBySubject.as_view(), name='single_tag_by_subject'),
    path('postblog/', PostBlogView.as_view(), name="postblog"),  # Retrieve data of all Blog + blogImage + tags
    path('postblog/<int:pk>/', PostBlogDetailsView.as_view(), name="postblogDetails"), # Retrieve data of specific Blog + blogImage + tags
    path('authorlist/', AuthorPostView.as_view(), name="authorPost"),  #Author List
    path('authorDetails/', AllAuthorDetailsWithBlogPost_blogImage_tags.as_view(), name="authorDetails"), # Retrieve data of all author with blogPost + blogImage + tags
    path('authorDetails/<int:pk>/', AuthorDetailsWithBlogPost_blogImage_tags.as_view(), name="authorDetails"), # Retrieve Details of Author with blogPost + blogImage + tags
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

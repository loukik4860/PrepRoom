from rest_framework import views, filters
from .serializers import BlogImageSerializer, TagSerializer, BlogModelSerializer, AuthorProfileSerializer, \
    AuthorAllDetailsSerializer, NestedTagSerializer
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, RetrieveAPIView
from .models import BlogModel, BlogImage, Tag
from AuthApp.models import AuthorUser
from .filters import AuthorUserFilter
from rest_framework.permissions import IsAuthenticated, AllowAny
from .permissions import IsAuthor
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle
from django_filters.rest_framework import DjangoFilterBackend
from .renderer import UserRenderer

class PostBlogImageView(ListCreateAPIView):
    queryset = BlogImage.objects.all()
    serializer_class = BlogImageSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [AllowAny]
    renderer_classes = [UserRenderer]

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)


class PostBlogImageDetailsView(RetrieveUpdateDestroyAPIView):
    queryset = BlogImage.objects.all()
    serializer_class = BlogImageSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [AllowAny]
    renderer_classes = [UserRenderer]

class PostTagView(ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    renderer_classes = [UserRenderer]
    authentication_classes = [JWTAuthentication]
    permission_classes = [AllowAny]
    filterset_fields = ['name']

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)


class PostTagDetailsView(RetrieveUpdateDestroyAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    renderer_classes = [UserRenderer]
    authentication_classes = [JWTAuthentication]
    permission_classes = [AllowAny]
    throttle_classes = [AnonRateThrottle]


class PostBlogView(ListCreateAPIView):
    queryset = BlogModel.objects.all()
    serializer_class = BlogModelSerializer
    renderer_classes = [UserRenderer]
    authentication_classes = [JWTAuthentication]
    permission_classes = [AllowAny]
    filterset_fields = {
        'title': ['icontains'],
        'content': ['icontains'],
    }

    def get_queryset(self):
        return BlogModel.objects.all().order_by('-id')

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(author=self.request.user)  # Assign the authenticated user as the author
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class PostBlogDetailsView(RetrieveUpdateDestroyAPIView):
    queryset = BlogModel.objects.all()
    serializer_class = BlogModelSerializer
    renderer_classes = [UserRenderer]
    authentication_classes = [JWTAuthentication]
    permission_classes = [AllowAny]


class BlogView(ListAPIView):
    pass


class AuthorPostView(ListAPIView):
    queryset = AuthorUser.objects.all()
    serializer_class = AuthorProfileSerializer
    renderer_classes = [UserRenderer]
    authentication_classes = [JWTAuthentication]
    permission_classes = [AllowAny]
    filterset_fields = ['Author_firstName', "Author_lastName"]


class AllAuthorDetailsWithBlogPost_blogImage_tags(ListAPIView):
    queryset = AuthorUser.objects.all()
    serializer_class = AuthorAllDetailsSerializer
    renderer_classes = [UserRenderer]
    authentication_classes = [JWTAuthentication]
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter,
                       filters.SearchFilter]  # filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = AuthorUserFilter
    filterset_fields = {
        'Author_firstName': ['icontains'],
        'Author_lastName': ['icontains'],
        'blog_posts__tag__name': ['icontains'],
    }


class AuthorDetailsWithBlogPost_blogImage_tags(RetrieveAPIView):
    queryset = AuthorUser.objects.all()
    serializer_class = AuthorAllDetailsSerializer
    renderer_classes = [UserRenderer]
    authentication_classes = [JWTAuthentication]
    permission_classes = [AllowAny]
    throttle_classes = [AnonRateThrottle, UserRateThrottle]


class TagDetailsWithPost(ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    renderer_classes = [UserRenderer]
    authentication_classes = [JWTAuthentication]
    permission_classes = [AllowAny]


class SingleTagDetailsWithPost(ListAPIView):
    serializer_class = NestedTagSerializer
    renderer_classes = [UserRenderer]
    authentication_classes = [JWTAuthentication]
    permission_classes = [AllowAny]

    def get_queryset(self):
        pk = self.kwargs['id']
        return Tag.objects.filter(id=pk)


class SingleTagBySubject(ListAPIView):
    serializer_class = BlogModelSerializer
    renderer_classes = [UserRenderer]
    lookup_field = 'name'

    def get_queryset(self):
        subject_name = self.kwargs['name']
        return BlogModel.objects.filter(tag__name=subject_name)

from rest_framework import serializers
from .models import BlogModel, BlogImage, Tag, BlogTitleImage
from AuthApp.models import AuthorUser


class AuthorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthorUser
        fields = ['id', 'Author_email', 'Author_firstName', 'Author_lastName', 'created_at', 'updated_at']

    def create(self, validated_data):
        return AuthorUser.objects.create(**validated_data)


class BlogTitleImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogTitleImage
        fields = ['id', 'image', 'caption']

    def create(self, validated_data):
        return BlogTitleImage.objects.create(**validated_data)


class BlogImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogImage
        fields = ['id', 'image', 'caption']

    def create(self, validated_data):
        return BlogImage.objects.create(**validated_data)


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

    def create(self, validated_data):
        return Tag.objects.create(**validated_data)


class BlogModelSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())
    Author = AuthorProfileSerializer(source="author", read_only=True)
    TitleBlog = BlogTitleImageSerializer(source='blog_title_image', read_only=True)
    Tag = TagSerializer(source='tag', read_only=True, many=True)

    class Meta:
        model = BlogModel
        fields = ['id', 'title', 'sub_title', 'content', 'publish_date', 'is_published', 'created_at', 'updated_at',
                  'author', 'Author', 'blog_title_image', 'TitleBlog', 'tag', 'Tag']


class PostBlogSerializer(serializers.ModelSerializer):
    post = AuthorProfileSerializer(many=True)

    class Meta:
        model = AuthorUser
        fields = ['Author_email', 'Author_firstName', 'Author_lastName', 'is_author', 'is_active', 'is_admin',
                  'created_at', 'updated_at', 'post', 'author']

    def create(self, validated_data):
        return AuthorUser.objects.create(**validated_data)


class AuthorAllDetailsSerializer(serializers.ModelSerializer):
    blog_posts = BlogModelSerializer(many=True)

    class Meta:
        model = AuthorUser
        fields = ['Author_email', 'Author_firstName', 'Author_lastName', 'is_author', 'is_active', 'is_admin',
                  'created_at', 'updated_at', 'blog_posts']

    def create(self, validated_data):
        return AuthorUser.objects.create(**validated_data)


class NestedTagSerializer(serializers.ModelSerializer):
    blog = BlogModelSerializer(source='tags', many=True)

    class Meta:
        model = Tag
        fields = ['id', 'name', 'tags', 'blog']

    def create(self, validated_data):
        return Tag.objects.create(**validated_data)



from rest_framework import serializers
from .models import AuthorUser
from blogApp.serializers import PostBlogSerializer
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import smart_str, force_str, force_bytes, DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .utils import Utils


class AuthorUserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = AuthorUser
        fields = ['Author_firstName', 'Author_lastName', 'Author_email', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')

        if password != password2:
            raise serializers.ValidationError("Password and confirm passwords does Not match")
        return super().validate(attrs)

    def create(self, validated_data):
        return AuthorUser.objects.create_user(**validated_data)


class AuthorLoginSerializer(serializers.ModelSerializer):
    Author_email = serializers.EmailField(max_length=100)

    class Meta:
        model = AuthorUser
        fields = ['Author_email', 'password']


class AuthorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthorUser
        fields = ['Author_email','Author_firstName','Author_lastName','is_author','is_active','is_admin','created_at','updated_at']


class AuthorChangePasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=100, style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(max_length=100, style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = AuthorUser
        fields = ['password', 'password2']

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        user = self.context.get('user')
        if password != password2:
            raise serializers.ValidationError("Password and confirm password Does Not Match")
        user.set_password(password)
        user.save()
        return attrs


class AuthorPasswordEmailResetSerializer(serializers.Serializer):
    Author_email = serializers.EmailField(max_length=100)

    def validate(self, attrs):
        Author_email = attrs.get('Author_email')
        if AuthorUser.objects.filter(Author_email=Author_email).exists():
            user = AuthorUser.objects.get(Author_email=Author_email)
            uid = urlsafe_base64_encode(force_bytes(user.id))
            print("Encoded UID", uid)
            token = PasswordResetTokenGenerator().make_token(user)
            print("Password Reset Token", token)
            link = 'http://127.0.0.1:8000/blog/password_reset_email/' + uid + '/' + token
            print("Password Reset Link:- ", link)
            body = " Click following Link to ResetPassword " + link
            data = {
                'subject': 'Reset your Password',
                'body': body,
                'to_email': user.Author_email
            }
            Utils.send_email(data)
            return attrs
        else:
            raise serializers.ValidationError("You are not Registered User ")

class UserPasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=100, style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(max_length=100, style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = AuthorUser
        fields = ['password', 'password2']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            password2 = attrs.get('password2')
            uid = self.context.get('uid')
            token = self.context.get('token')
            user = self.context.get('user')
            if password!=password2:
                raise serializers.ValidationError("Password And confirm password does Not match")
            id = smart_str(urlsafe_base64_decode(uid))
            user = AuthorUser.objects.get(id=id)
            if not PasswordResetTokenGenerator.check_token(user,token):
                return serializers.ValidationError("Token is not valid or expired")
            user.set_password(password)
            user.save()
            return attrs
        except DjangoUnicodeDecodeError as identifier:
            PasswordResetTokenGenerator().check_token(user,token)
            raise serializers.ValidationError("Token is not valid or Expired")




from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .renderers import UserRenderers
from django.contrib.auth import authenticate, login
from .serializers import AuthorUserRegistrationSerializer, AuthorLoginSerializer, AuthorProfileSerializer, \
    AuthorChangePasswordSerializer, AuthorPasswordEmailResetSerializer, UserPasswordResetSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from blogApp.permissions import IsAuthor

def get_tokens_for_user(user):
    '''
    generate Token Manually
    :param user:
    :return:
    '''
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class AuthorUserRegistrationView(APIView):
    renderer_classes = [UserRenderers]

    def post(self, request, format=None):
        serializer = AuthorUserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            token = get_tokens_for_user(user)
            return Response({'token': token, 'msg': "registration Successful"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AuthorLoginView(APIView):
    renderer_classes = [UserRenderers]

    def post(self, request, format=None):
        serializer = AuthorLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            Author_email = serializer.data.get('Author_email')
            password = serializer.data.get('password')
            user = authenticate(Author_email=Author_email, password=password)
            print(user)
            if user is not None:
                token = get_tokens_for_user(user)
                return Response({'token': token, 'msg': "Login Successful"}, status=status.HTTP_200_OK)
            else:
                return Response({'errors': {'non_fields_errors': ['Email or password is not valid']}},
                                status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AuthorProfileView(APIView):
    renderer_classes = [UserRenderers]
    permission_classes = [IsAuthenticated,IsAuthor]

    def get(self, request, format=None):
        serializer = AuthorProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AuthorChangePassword(APIView):
    renderer_classes = [UserRenderers]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        serializer = AuthorChangePasswordSerializer(data=request.data, context={'user': request.user})
        if serializer.is_valid(raise_exception=True):
            return Response({'msg': 'Password Changed Successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AuthorPasswordResetEmailView(APIView):
    def post(self, request, format=None):
        serializer = AuthorPasswordEmailResetSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return Response({'msg': 'Password Link Send to Email ID Check your Email'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AuthorPasswordReset(APIView):
    renderer_classes = [UserRenderers]

    def post(self, request, uid, token, format=None):
        serializer = UserPasswordResetSerializer(data=request.data, context={'uid': uid, 'token': token})
        if serializer.is_valid(raise_exception=True):
            return Response({'msg': 'Password Reset Successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ------------------------------------------------------------------------------------------------------------------------#



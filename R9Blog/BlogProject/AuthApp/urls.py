from django.urls import path,include
from .views import AuthorUserRegistrationView,AuthorLoginView,AuthorProfileView,AuthorChangePassword,AuthorPasswordResetEmailView,AuthorPasswordReset

urlpatterns = [
    path('register/',AuthorUserRegistrationView.as_view(),name="register"),
    path('login/',AuthorLoginView.as_view(),name="login"),
    path('profile/',AuthorProfileView.as_view(),name="profile"),
    path('changePassword/',AuthorChangePassword.as_view(),name="changePassword"),
    path('password_reset_email/',AuthorPasswordResetEmailView.as_view(),name="resetEmail"),
    path('password_reset/<uid>/<token>/',AuthorPasswordReset.as_view(),name="passwordReset"),
]
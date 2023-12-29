from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


# Create your models here.

class AuthorUserManager(BaseUserManager):
    def create_user(self, Author_firstName, Author_lastName, Author_email, password=None, password2=None):
        if not Author_email:
            raise ValueError("Users must have an email address")

        user = self.model(
            Author_email=self.normalize_email(Author_email),
            Author_firstName=Author_firstName,
            Author_lastName=Author_lastName
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, Author_firstName, Author_lastName, Author_email, password=None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            Author_email=Author_email,
            Author_firstName=Author_firstName,
            Author_lastName=Author_lastName
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class AuthorUser(AbstractBaseUser):
    Author_email = models.EmailField(max_length=100, unique=True)
    Author_firstName = models.CharField(max_length=100)
    Author_lastName = models.CharField(max_length=100)
    is_author = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_regular_user = models.BooleanField(default=False,null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = AuthorUserManager()

    USERNAME_FIELD = "Author_email"
    REQUIRED_FIELDS = ['Author_firstName', 'Author_lastName']

    def __str__(self):
        return f"{self.id}--{self.Author_firstName}--{self.Author_lastName}"

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin

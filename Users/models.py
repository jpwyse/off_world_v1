from django.db import models
from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.utils import timezone
from django_fsm import FSMField, transition
from . config import CONSTANTS, AUTH_SETTINGS
from . import crypto

# Create your models here.


class User(AbstractUser):
	first_name = models.CharField(max_length=50, blank=False, null=False)
	last_name = models.CharField(max_length=100, blank=False, null=False)
	full_name = models.CharField(max_length=150, blank=False, null=True)
	email = models.CharField(max_length=150, blank=False, null=False)
	phone = models.CharField(max_length=25, blank=True, null=True)
	dob = models.DateField(blank=True, null=True)
	gender = models.CharField(max_length=2, blank=True, null=True)
	location = models.CharField(max_length=50, blank=True, null=True)
	avatar = models.ImageField(upload_to="Users/media/avatars", blank=True, null=True)
	passcode = models.CharField(max_length=50, blank=True, null=True)

	def __str__(self):
		return f"{self.full_name} | @{self.username}"


	@property
	def full_name(self):
		return f"{self.first_name} {self.last_name}"
	



class AuthTokenManager(models.Manager):
    def create(self, user, expiry=AUTH_SETTINGS.TOKEN_TTL):
        token = crypto.create_token_string()
        digest = crypto.hash_token(token)

        if expiry is not None:
            expiry = timezone.now() + expiry

        instance = super(AuthTokenManager, self).create(
            token_key=token[:CONSTANTS.TOKEN_KEY_LENGTH], digest=digest,
            user=user, expiry=expiry)
        return instance, token



class AuthToken(models.Model):
    objects = AuthTokenManager()

    digest = models.CharField(max_length=CONSTANTS.DIGEST_LENGTH, primary_key=True)
    token_key = models.CharField(max_length=CONSTANTS.TOKEN_KEY_LENGTH, db_index=True)
    user = models.ForeignKey(User, null=False, blank=False, related_name='user_tokens', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    expiry = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return '%s : %s' % (self.digest, self.user)


'''
@receiver(post_save, sender=User)
def welcome_email(sender, instance, created, **kwargs):
	if created:
		admin_email = settings.EMAIL_HOST_USER
		template = 'email/welcome_email.html'
		context = {'username': instance.get_username(), 'admin_email': admin_email}
		html_message = render_to_string(template, context)

		message = EmailMessage(
			subject="Let's ride",
			body=html_message,
			from_email=admin_email,
			to=[instance.email],
			reply_to=[admin_email],
		)
		message.content_subtype = 'html'
		message.send()
		print(f"Email sent to {instance.email}.")'''


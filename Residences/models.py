import locale
from datetime import date, datetime, timedelta
from django.db import models
from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.utils import timezone
from django.core.exceptions import ValidationError
from django_fsm import FSMField, transition
from Users.models import User

# Create your models here.


def amenities_default():
	return [None]


class Residence(models.Model):
	user = models.ForeignKey(User, related_name='residences', on_delete=models.CASCADE, null=True)
	state = models.CharField(max_length=25, blank=True, null=True)
	city = models.CharField(max_length=25, blank=True, null=True)
	zip_code = models.CharField(max_length=25, blank=True, null=True)
	address = models.CharField(max_length=250, blank=True, null=True)
	location = models.CharField(max_length=50, blank=True, null=True)
	neighborhood = models.CharField(max_length=50, blank=True, null=True)
	building = models.CharField(max_length=25, blank=True, null=True)
	name = models.CharField(max_length=50, blank=True, null=True)
	arrangement = models.CharField(max_length=25, blank=True, null=True)
	rooms = models.CharField(max_length=25, blank=True, null=True)
	beds = models.CharField(max_length=10, blank=True, null=True)
	baths = models.CharField(max_length=10, blank=True, null=True)
	sq_ft = models.CharField(max_length=25, blank=True, null=True)
	pets = models.CharField(max_length=25, blank=True, null=True)
	smoking = models.CharField(max_length=25, blank=True, null=True)
	party = models.CharField(max_length=25, blank=True, null=True)
	cleaning = models.CharField(max_length=25, blank=True, null=True)
	linens = models.CharField(max_length=25, blank=True, null=True)
	amenities = models.JSONField(blank=True, null=True, default=amenities_default)
	description = models.CharField(max_length=1000, blank=True, null=True)
	active = models.BooleanField(default=False)
	updated = models.DateTimeField(auto_now=True, null=True)

	def __str__(self):
		return f"{self.user} | {self.location} - {self.address}"

	
	def save(self, *args, **kwargs):
		self.name = self.name.upper()
		return super(Residence, self).save(*args, **kwargs)


	@property
	def location(self):
		return f"{self.city}, {self.state} {self.zip_code}"

	


#Images Model
def image_media_path(instance, filename):
	return f'images/{filename}'


class Images(models.Model):
	url = models.ImageField(null=True)
	description = models.CharField(max_length=50, blank=True, null=True)
	default = models.BooleanField(default=False)
	residence = models.ForeignKey(Residence, related_name='images', on_delete=models.CASCADE, null=True)
	#album = models.ForeignKey(ImageAlbum, related_name='images', on_delete=models.CASCADE, blank=True, null=True)


	def __str__(self):
		return f"{self.residence} | {self.url} | {self.description}"


	






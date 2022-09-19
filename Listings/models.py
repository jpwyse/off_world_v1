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
from Residences.models import Residence


# Create your models here.

class Listing(models.Model):
	residence = models.OneToOneField(Residence, related_name="property", on_delete=models.CASCADE, null=True)
	arrival_date = models.CharField(max_length=25, blank=True, null=True)
	departure_date = models.CharField(max_length=25, blank=True, null=True)
	arrival_time = models.CharField(max_length=25, blank=True, null=True)
	departure_time = models.CharField(max_length=25, blank=True, null=True)
	duration = models.CharField(max_length=25, blank=True, null=True)
	active = models.BooleanField(default=False)
	created = models.DateTimeField(auto_now_add=True, null=True)
	updated = models.DateTimeField(auto_now=True, null=True)

	def __str__(self):
		return f"Address: {self.residence.address} || User: {self.residence.user}"







	









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
from django.contrib.contenttypes.fields import GenericRelation
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django_fsm import FSMField, transition
from Users.models import User
from Residences.models import Residence
from Listings.models import Listing
#from Notifications.models import Notification


# Create your models here.


class Status(object):
    PENDING = 'Pending'
    ACCEPTED = 'Accepted'
    REJECTED = 'Rejected'
    CANCELED = 'Canceled'

    STARTING = 'Starting'
    ACTIVE = 'Active'
    ENDING = 'Ending'
    COMPLETED = 'Completed'
    VOIDED = 'Voided'
    ERROR = 'Error'


    OFFER_CHOICES = (
        (PENDING, PENDING),
        (ACCEPTED, ACCEPTED),
        (REJECTED, REJECTED),
        (CANCELED, CANCELED),
        (ERROR, ERROR),
    )

    CONTRACT_CHOICES = (
        (STARTING, STARTING),
        (ACTIVE, ACTIVE),
        (ENDING, ENDING),
        (COMPLETED, COMPLETED),
        (VOIDED, VOIDED)
        #(ERROR, ERROR),
    )


class Swap(models.Model):
	residence_bid = models.ForeignKey(Residence, related_name='residence_bid', on_delete=models.DO_NOTHING, null=True)
	residence_ask = models.ForeignKey(Residence, related_name='residence_ask', on_delete=models.DO_NOTHING, null=True)
	bidder = models.ForeignKey(User, related_name='bidder', on_delete=models.DO_NOTHING, null=True)
	asker = models.ForeignKey(User, related_name='asker', on_delete=models.DO_NOTHING, null=True)
	listing = models.ForeignKey(Listing, related_name='swap_listing', on_delete=models.DO_NOTHING, null=True)
	status = FSMField(default=Status.PENDING, choices=Status.OFFER_CHOICES)
	created = models.DateTimeField(auto_now_add=True, null=True)
	updated = models.DateTimeField(auto_now=True, null=True)
	

	def __str__(self):
		return f"Status: {self.status} || Bidder: {self.bidder.username} -- Bid: {self.residence_bid.address} | Asker: {self.asker.username} -- Ask: {self.residence_ask.address}"


	
	@transition(field=status, source=Status.PENDING, target=Status.ACCEPTED)
	def pending_to_accepted(self):
		return True

	@transition(field=status, source=Status.PENDING, target=Status.REJECTED)
	def pending_to_rejected(self):
		return True

	@transition(field=status, source=Status.PENDING, target=Status.CANCELED)
	def pending_to_canceled(self):
		return True

	@transition(field=status, source=Status.PENDING, target=Status.ERROR)
	def pending_to_error(self):
		return True

	@transition(field=status, source=[Status.ACCEPTED, Status.REJECTED, Status.CANCELED, Status.ERROR], target=Status.PENDING)
	def status_to_pending(self):
		return True

	@transition(field=status, source=[Status.PENDING, Status.ACCEPTED, Status.REJECTED, Status.CANCELED], target=Status.ERROR)
	def status_to_error(self):
		return True




		



class Contract(models.Model):
	swap = models.ForeignKey(Swap, related_name='swap', on_delete=models.DO_NOTHING, null=True)
	status = FSMField(default=Status.STARTING, choices=Status.CONTRACT_CHOICES)
	days_to_start = models.DateTimeField(blank=True, null=True)
	days_to_end = models.DateTimeField(blank=True, null=True) 
	created = models.DateTimeField(auto_now_add=True, null=True)
	updated = models.DateTimeField(auto_now=True, null=True)


	def __str__(self):
		return f"Contract: {self.swap}"

	'''
	def save(self, *args, **kwargs):
		if self.days_to_start is not None:

		return super(Residence, self).save(*args, **kwargs)'''


	
	
	@transition(field=status, source=Status.STARTING, target=Status.ACTIVE)
	def contract_to_active(self):
		return True

	@transition(field=status, source=Status.STARTING, target=Status.VOIDED)
	def contract_to_voided(self):
		return True

	@transition(field=status, source=Status.ACTIVE, target=Status.ENDING)
	def contract_to_ending(self):
		return True

	@transition(field=status, source=Status.ACTIVE, target=Status.COMPLETED)
	def contract_to_ending(self):
		return True

	@transition(field=status, source=Status.ENDING, target=Status.COMPLETED)
	def contract_to_completed(self):
		return True


	'''
	@transition(field=status, source=[Status.STARTING, Status.ACTIVE, Status.ENDING, Status.COMPLETED], target=Status.ENDING)
	def contract_to_error(self):
		return True'''




'''
@receiver(post_save, sender=Swap)
def swap_offer_notification(sender, instance, created, **kwargs):
	if not created:
		if instance.status == "Accepted":
			contract = Contract.objects.create(swap=instance)
			print("new swap contract Accepted")

		if instance.status == "Rejected":
			sender = instance.asker
			recipient = instance.bidder
			swap_offer_msg = {
				"recipient": recipient,
				"sender": sender,
				"subject": "Swap Offer Rejected ",
				"message": f"Your swap offer to @{sender.username} has been rejected.",
				"details": {'type': 'OFFER', 'id': instance.id, 'status': instance.status},
				"content_object": instance,
			}
			notification = Notification.objects.create(**swap_offer_msg)

		if instance.status == "Canceled":
			sender = instance.bidder
			recipient = instance.asker
			swap_offer_msg = {
				"recipient": recipient,
				"sender": sender,
				"subject": "Swap Bid Canceled",
				"message": f"@{sender.username} has canceled their swap bid.",
				"details": {'type': 'OFFER', 'id': instance.id, 'status': instance.status},
				"content_object": instance,
			}
			notification = Notification.objects.create(**swap_offer_msg)
	
	else:
		pass'''


		




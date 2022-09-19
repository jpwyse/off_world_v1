import traceback
import sys
from datetime import datetime, date
from typing import List
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.db import IntegrityError
from django.utils import timezone
from ninja import Router, Schema, ModelSchema, Field, Form
from ninja.orm import create_schema
from ninja.errors import HttpError
from ninja.responses import Response
from . schema import ListingSchema, CreateListingSchema, ListingResidenceSchema, UpdateListingSchema
from . models import Listing
from Residences.models import Residence

# Create your api's here.

router = Router()


@router.post("/create")
def create(request, form: CreateListingSchema):
	form_data = form.dict()
	residence_id = form_data.pop('residence')
	residence = get_object_or_404(Residence, pk=residence_id)

	if form_data['arrival_time'] is None:
		arrival_time = datetime.strptime('14:00', '%H:%M').time()
		form_data['arrival_time'] = arrival_time.strftime('%I:%M %p')

	if form_data['departure_time'] is None:
		departure_time = datetime.strptime('16:00', '%H:%M').time()
		form_data['departure_time'] = departure_time.strftime('%I:%M %p')
	
	try:
		listing, created = Listing.objects.get_or_create(residence=residence, defaults={**form_data})
		if created:
			residence.active = True
			residence.save()
			return {"success": True}
		else:
			raise HttpError(409, "This residence has already been added as a new listing.")
	except Exception as error:
		print(traceback.format_exc())
		raise HttpError(403, "Unable to create new listing at this time. Please try again later or contact support.")



@router.post("/update/{listing_id}")
def update(request, listing_id: int, form: UpdateListingSchema = Form(...)):
	form = form.dict()
	residence_id = form.pop('residence')
	residence = get_object_or_404(Residence, pk=residence_id)

	form_data = {}
	for key, value in form.items():
		if value != "" and value != " ":
			form_data[key] = value

	try:
		listing, created = Listing.objects.update_or_create(id=listing_id, residence=residence, defaults={**form_data})
		if created:
			raise HttpError(403, "Error with listing. Please try again later or contact support.")
		else:
			return {"success": True}
	except Exception as error:
		print(traceback.format_exc())
		raise HttpError(403, "Unable to update listing at this time. Please try again later or contact support.")


	


@router.get("/all", response=List[ListingResidenceSchema])
def all(request):
	return Listing.objects.all().order_by('-active', '-updated')



@router.get("/retrieve/{user_id}", response=List[ListingResidenceSchema])
def retrieve(request, user_id: int):
	listings = Listing.objects.filter(residence__user__pk=user_id).all()
	return listings





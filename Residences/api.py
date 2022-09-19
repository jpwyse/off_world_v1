import traceback
import sys
from datetime import datetime, date
from typing import List
from PIL import Image

from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.db import IntegrityError
from django.utils import timezone
from django.shortcuts import render, HttpResponse, redirect

from ninja import Router, Schema, ModelSchema, Field, Form, File
from ninja.files import UploadedFile
from ninja.orm import create_schema
from ninja.errors import HttpError
from ninja.responses import Response

from Users.models import User
from . models import Residence, Images
from . schema import ResidenceSchema, ImagesSchema, CreateResidenceSchema, UpdateResidenceSchema

# Create your api's here.

router = Router()


@router.post("/create/{user_id}")
def create(request, user_id: int, form: CreateResidenceSchema = Form(...), images: List[UploadedFile] = File(None)):
	form_data = form.dict()
	amenities = form_data['amenities'][0]
	if amenities != "":
		form_data['amenities'] = amenities.split(",")

	user = get_object_or_404(User, pk=user_id)
	try:
		residence, created = Residence.objects.get_or_create(user=user, address=form_data["address"], defaults={**form_data})
		if created:
			if images is not None:
				for img in images:
					Images.objects.create(residence=residence, url=img)	
			return {"success": True}
		else:
			raise HttpError(409, "This residence has already been created.")
	except Exception as error:
		print(traceback.format_exc())
		raise HttpError(403, "Error creating new residence. Please try again later or contact support.")



@router.post("/update/{residence_id}")
def update(request, residence_id: int, form: CreateResidenceSchema = Form(...), images: List[UploadedFile] = File(None)):
	form = form.dict()
	form_amenities = form.pop("amenities")
	form_amenities = form_amenities[0]

	residence = Residence.objects.filter(id=residence_id)
	if residence.exists():
		residence_dict = list(residence.values(
			'state', 'city', 'zip_code', 'name', 
			'address', 'neighborhood', 'building', 
			'arrangement', 'rooms', 'beds', 
			'baths', 'sq_ft', 'pets', 'smoking', 
			'party', 'cleaning', 'linens',
			'amenities', 'description',
		))[0]
		old_amenities = residence_dict.pop("amenities")

		form_data = {}
		for key, value in form.items():
			if value != "" and value != " ":
				form_data[key] = value

		data = dict(form_data.items() - residence_dict.items())
		if form_amenities != "":
			new_amenities = form_amenities.split(",")
			amenities = list(set(new_amenities + old_amenities))
			data['amenities'] = amenities

		try:
			residence.update(**data)
			if images is not None:
				residence_obj = get_object_or_404(Residence, pk=residence_id)
				for img in images:
					Images.objects.create(residence=residence_obj, url=img)
			return {"success": True}
		except Exception as error:
			print(traceback.format_exc())
			raise HttpError(403, "Error updating residence. Please try again later or contact support.")
	else:
		raise HttpError(404, "Residence not found.")
	

	



@router.get("/retrieve/{user_id}/{active}", response=List[ResidenceSchema])
def retrieve(request, user_id: int, active: bool):
	residence = Residence.objects.filter(user__pk=user_id).all()
	if residence.exists():
		if active is False:
			return residence
		else:
			residence = residence.exclude(active=True)
		return residence
	else:
		return Response(None, status=204)

	

@router.get("/images/{residence_id}", response=List[ImagesSchema])
def retrieve_images(request, residence_id: int):
	return Images.objects.filter(residence=residence_id).all()


@router.post("/delete_images/{img_id}")
def delete_images(request, img_id: int):
	image = get_object_or_404(Images, pk=img_id)
	try:	
		image.delete()
		return {"success": True}
	except Exception as error:
		print(traceback.format_exc())
		raise HttpError(403, "Error attempting to delete image. Please try again later or contact support.")



@router.get("/delete")
def delete_all(request):
	Residence.objects.all().delete()
	return {"success": True}
	
	












	


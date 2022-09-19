from typing import List
from datetime import datetime, date

from ninja import Schema, ModelSchema, Field, Form, File
from ninja.files import UploadedFile
from ninja.orm import create_schema

from Users.models import User
from Residences.models import Residence
#from Residences.schema import ResidenceSchema, OwnerSchema
from . models import Listing


# Create your schemas here.


UserSchema = create_schema(User, fields=['id', 'username', 'email', 'first_name', 'last_name', 'phone', 'avatar'])
ResidenceSchema = create_schema(Residence, custom_fields=[('user', UserSchema, None)])
ListingResidenceSchema = create_schema(Listing, custom_fields=[('residence', ResidenceSchema, None)])

'''
class ResidenceSchema(Schema):
	id: int
	state: str
	city: str
	zip_code: str
	address: str 
	neighborhood: str = None
	kind: str = None
	arrangement: str = None
	beds: str = None
	baths: str = None
	sq_ft: str = None
	description: str = None
	amenities_list: list = None
	alias: str = None
	user_info: dict = None
	#images: ImagesSchema'''


class CreateListingSchema(Schema):
	residence: int
	arrival_date: str 
	departure_date: str 
	arrival_time: str = None
	departure_time: str = None
	dates_flexible: str = None
	times_flexible: str = None
	active: bool = True

class UpdateListingSchema(Schema):
	residence: int
	arrival_date: str = None 
	departure_date: str = None
	arrival_time: str = None
	departure_time: str = None
	dates_flexible: str = None
	times_flexible: str = None
	active: bool = True


class ListingSchema(Schema):
	id: int
	rate: float
	daily_rate: float
	start_date: str 
	end_date: str
	flexibility: str
	residence: ResidenceSchema = None
	#owner: OwnerSchema = None

'''

class ListingResidenceSchema(Schema):
	id: int
	start_date: date = None
	end_date: date = None
	rate: str = None
	status: str = None
	residence: ResidenceSchema


class OwnerSchema(Schema):
	first_name: str = None
	last_name: str = None
	username: str = None
	email: str = None
	phone: str = None



class ResidenceSchema(Schema):
	id: int
	state: str
	city: str
	zip_code: str
	address: str 
	neighborhood: str = None
	kind: str = None
	arrangement: str = None
	rent: str = None
	beds: str = None
	baths: str = None
	sq_ft: str = None
	description: str = None
	amenities: dict = None
	alias: str = None
	owner: OwnerSchema
	#images: ImagesSchema'''
	






'''
class ImageSchema(ModelSchema):
    class Config:
        model = Image
        model_exclude = ['album']


class Images(Schema):
	url: str'''


'''
class ImageSchema(ModelSchema):
    class Config:
        model = Image
        model_exclude = ['album']
#ImageSchema = create_schema(Image, fields=['id', 'img_url'])

class AlbumSchema(Schema):
	images: ImageSchema'''


'''
class ImageSchema(Schema):
	img_url: str'''


#ImageSchema = create_schema(Image, fields=['id', 'img_url'])



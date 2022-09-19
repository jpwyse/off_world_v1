from typing import List
from datetime import datetime, date

from ninja import Schema, ModelSchema, Field, Form, File
from ninja.files import UploadedFile
from ninja.orm import create_schema

from . models import Residence


# Create your schemas here.

#ResidenceSchema = create_schema(Residence, depth=1)


class OwnerSchema(Schema):
	first_name: str = None
	last_name: str = None
	username: str = None
	email: str = None
	phone: str = None
	full_name: str = None



class ResidenceSchema(Schema):
	id: int
	state: str
	city: str
	zip_code: str
	address: str 
	neighborhood: str = None
	building: str = None
	location: str = None
	name: str = None
	arrangement: str = None
	rooms: str = None
	beds: str = None
	baths: str = None
	sq_ft: str = None
	pets: str = None
	smoking: str = None
	party: str = None
	cleaning: str = None
	linens: str = None
	amenities: list = None
	description: str = None
	active: bool = False
	#owner: OwnerSchema = None
	#images: ImagesSchema
	



class CreateResidenceSchema(Schema):
	state: str
	city: str
	zip_code: str
	address: str 
	neighborhood: str = None
	building: str = None
	name: str = None
	arrangement: str = None
	rooms: str = None
	beds: str = None
	baths: str = None
	sq_ft: str = None
	pets: str = None
	smoking: str = None
	party: str = None
	cleaning: str = None
	linens: str = None
	amenities: list = None
	description: str = None



class ImagesSchema(Schema):
	id: int = None 
	url: str = None


class UpdateResidenceSchema(Schema):
	id: int
	state: str = None
	city: str = None
	zip_code: str = None
	address: str = None 
	neighborhood: str = None
	building: str = None
	arrangement: str = None
	rooms: str = None
	beds: str = None
	baths: str = None
	sq_ft: str = None
	pets: str = None
	smoking: str = None
	party: str = None
	cleaning: str = None
	linens: str = None
	amenities: list = None
	alias: str = None
	description: str = None



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





#ImageSchema = create_schema(Image, fields=['id', 'img_url'])



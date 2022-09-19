import traceback
import sys
from datetime import date
from typing import List
from PIL import Image


from ninja import Router, Schema, ModelSchema, Field, Form, File
from ninja.files import UploadedFile
from ninja.orm import create_schema
from ninja.errors import HttpError
from ninja.responses import Response

from Users.models import User
from Residences.models import Residence
from Listings.models import Listing
from . models import Swap


# Create your schemas's here.

UserSchema = create_schema(User, fields=['id', 'username', 'email', 'first_name', 'last_name', 'phone', 'avatar'])
ResidenceSchema = create_schema(Residence, custom_fields=[('user', UserSchema, None)])
ListingSchema = create_schema(Listing, custom_fields=[('residence', ResidenceSchema, None)])
SwapContractSchema = create_schema(Swap, custom_fields=[('listing', ListingSchema, None)])




class SwapModelSchema(ModelSchema):
    class Config:
        model = Swap
        model_fields = "__all__"


class SwapOfferSchema(Schema):
	id: int
	residence_bid: ResidenceSchema 
	residence_ask: ResidenceSchema 
	bidder: UserSchema
	asker: UserSchema
	listing: ListingSchema
	status: str = None
	created: date
	updated: date


class ContractSchema(Schema):
	swap: SwapOfferSchema
	status: str = None
	days_to_start: date = None
	days_to_end: date = None
	created: date
	updated: date
        

class CreateSwapSchema(Schema):
	residence_bid: int = None
	residence_ask: int = None
	offeror: int = None
	offeree: int = None
	arrival: str = None
	departure: str = None
	duration: str = None
	#listing: int = None

class OfferSchema(Schema):
	id: int
	residence_bid: ResidenceSchema 
	residence_ask: ResidenceSchema 
	bidder: UserSchema
	asker: UserSchema
	listing: ListingSchema
	status: str = None
	created: date
	updated: date




class SwapOfferSchema(Schema):
	residence_bid: int 
	residence_ask: int 
	bidder: int
	asker: int
	listing: int
	
	








	
	
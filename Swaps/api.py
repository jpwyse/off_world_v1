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
from django.db.models import Q

from ninja import Router, Schema, ModelSchema, Field, Form, File
from ninja.files import UploadedFile
from ninja.orm import create_schema
from ninja.errors import HttpError
from ninja.responses import Response

from Users.models import User
from Residences.models import Residence
from Listings.models import Listing

from . schema import SwapOfferSchema, CreateSwapSchema, OfferSchema, SwapModelSchema, ContractSchema
from . models import Swap, Contract



# Create your api's here.


router = Router()


@router.post("/create")
def create_offer(request, offer: SwapOfferSchema):
	residence_bid = get_object_or_404(Residence, pk=offer.residence_bid)
	residence_ask = get_object_or_404(Residence, pk=offer.residence_ask)
	bidder = get_object_or_404(User, pk=offer.bidder)
	asker = get_object_or_404(User, pk=offer.asker)
	listing = get_object_or_404(Listing, pk=offer.listing)

	data = {
		'bidder': bidder,
		'asker': asker,
		'residence_ask': residence_ask,
	}

	try:
		swap, created = Swap.objects.get_or_create(
			residence_bid=residence_bid, 
			listing=listing,
			defaults={**data},
		)
		if created:
			return {"success": True}
		else:
			raise HttpError(405, "A swap offer for this listing has already been submitted for your residence.")
	except Exception as error:
		print('\n')
		print(traceback.format_exc())
		raise HttpError(403, "Unable to submit new swap offer at this time. Please try again later or contact support.")



@router.get("/retrieve/{user_id}/{overture}", response=List[OfferSchema])
def retrieve_bids(request, user_id: int, overture: str):
	user = get_object_or_404(User, pk=user_id)

	if overture == "bid":
		swap_bids = Swap.objects.filter(bidder=user).all()
		return swap_bids
	if overture == "ask":
		swap_asks = Swap.objects.filter(asker=user).all()
		return swap_asks
	else:
		return Response(None, status=204)



@router.get("/offer_response/{swap_id}/{choice}")
def update(request, swap_id: int, choice: str):
	swap = get_object_or_404(Swap, pk=swap_id)

	try:
		if choice == "accept":
			status = swap.pending_to_accepted()
			swap.save()
			if status is True: 
				return Response("Swap offer has been accepted.", status=202)
			else:
				raise HttpError(403, "Unable to accept swap offer at this time. Please try again later or contact support.")


		if choice == "reject":
			status = swap.pending_to_rejected()
			swap.save()
			if status is True: 
				return Response("Swap offer has been rejected.", status=202)
			else:
				raise HttpError(403, "Unable to reject swap offer at this time. Please try again later or contact support.")

	except Exception as error:
		print('\n')
		print(traceback.format_exc())
		raise HttpError(403, "Unable to update swap offer status at this time. Please try again later or contact support.")



@router.post("/create_contract/{swap_id}")
def create_contract(request, swap_id: int):
	swap = get_object_or_404(Swap, pk=swap_id)
	
	try:
		contract, created = Contract.objects.get_or_create(swap=swap) 
		if created:
			return {"success": True}
		else:
			raise HttpError(405, "This swap contract has already been accepted.")
	except Exception as error:
		print('\n')
		print(traceback.format_exc())
		raise HttpError(403, "Unable to submit new swap offer at this time. Please try again later or contact support.")



@router.get("/retrieve_contracts/{user_id}", response=List[ContractSchema])
def retrieve_contracts(request, user_id: int):
	user = get_object_or_404(User, pk=user_id)
	contracts = Contract.objects.filter(Q(swap__bidder__pk=user.id) | Q(swap__asker__pk=user.id)).all()
	print(contracts.values())
	return contracts



@router.get("/void_contract/{contract_id}")
def void_contract(request, contract_id: int):
	contract = get_object_or_404(Contract, pk=contract_id)
	status = contract.contract_to_voided()
	contract.save()
	if status is True:
		return {"success": True}
	else:
		raise HttpError(403, "Unable to void swap contract at this time. Please try again later or contact support.")


@router.get("/cancel_bid/{swap_id}")
def cancel_bid(request, swap_id: int):
	swap = get_object_or_404(Swap, pk=swap_id)
	status = swap.pending_to_canceled()
	swap.save()
	if status is True:
		return {"success": True}
	else:
		raise HttpError(403, "Unable to retract swap bid at this time. Please try again later or contact support.")


	




	
	





	

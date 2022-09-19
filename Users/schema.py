from datetime import date
from typing import List
from ninja import Router, Schema, ModelSchema, Field, Form
from ninja.orm import create_schema

# Create your schemas's here.

class UserSchema(Schema):
	id: int = None
	first_name: str = None
	last_name: str = None
	full_name: str = None
	username: str = None
	email: str = None
	phone: str = None
	date_joined: date = None


class RegisterSchema(Schema):
	firstname: str
	lastname: str
	username: str
	email: str
	phone: str
	dob: str
	gender: str
	password: str
	passcode: str


class LoginSchema(Schema):
	username: str
	password: str


class AuthSchema(Schema):
	token_key: str
	user: UserSchema



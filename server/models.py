from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt
from datetime import datetime

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())
    name = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    gender = db.Column(db.String, nullable=False)
    preference = db.Column(db.String, nullable=False)
    profile_picture = db.Column(db.String)
    location = db.Column(db.String, nullable=False)
    location_range = db.Column(db.Integer)
    bio = db.Column(db.String)
    interests = db.Column(db.String)
    swiped = db.Column(db.String)
    rejected = db.Column(db.String)
    friends = db.Column(db.String)

    connections = db.relationship('Connection', back_populates='user')

    events = association_proxy('connections', 'event')

    def __repr__(self):
        return f"User #{self.id}: {self.email}"

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        self._password_hash = password_hash

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

    @validates('name')
    def validate_name(self, _, value):
        if not isinstance(value, str):
            raise Exception('Name must be a string.')
        return value

    @validates('age')
    def validate_age(self, _, value):
        if not isinstance(value, int):
            raise Exception('Age must be an integer.')
        return value

    @validates('email')
    def validate_email(self, _, value):
        if not isinstance(value, str):
            raise Exception('Email must be a valid string.')
        elif '@' not in value:
            raise Exception('Email must contain @.')
        return value

    @validates('password')
    def validate_password(self, _, value):
        if not isinstance(value, str):
            raise Exception('Password must be a string.')
        elif not 5 <= len(value) <= 20:
            raise Exception('Password must be between 5 and 20 characters.')
        return value

    @validates('profile_picture')
    def validate_profile_picture(self, _, value):
        if not isinstance(value, str):
            raise Exception('Name must be a string.')
        return value

class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    date = db.Column(db.String)
    time = db.Column(db.String)
    location = db.Column(db.String)
    details = db.Column(db.String)

    def __repr__(self):
        return f"Event #{self.id} : {self.name}"
    
    @validates('name')
    def validate_name(self, _, value):
        if not isinstance(value, str):
            raise ValueError('Name must be a valid string.')
        return value

    @validates('date')
    def validate_date(self, _, value):
        if not isinstance(value, str):
            raise ValueError('Date must be a valid string.')
        return value
    
    @validates('time')
    def validate_time(self, _, value):
        if not isinstance(value, str):
            raise ValueError('Time must be a valid string.')
        return value
    
    @validates('location')
    def validate_location(self, _, value):
        if not isinstance(value, str):
            raise ValueError('Location must be a valid string.')
        return value
    
    @validates('details')
    def validate_details(self, _, value):
        if not isinstance(value, str):
            raise ValueError('Details must be a valid string.')
        return value

    connections = db.relationship('Connection', back_populates='event')

    users = association_proxy('connections', 'user')

class Connection(db.Model, SerializerMixin):
    __tablename__ = 'connections'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), cascade='all, delete-orphan')
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), cascade='all, delete-orphan')

    def __repr__(self):
        return f"Connection #{self.id} for user #{self.user_id}"

    @validates('user_id')
    def validate_event_id(self, _, value):
        if not isinstance(value, int):
            raise ValueError('User Id must be an integer.')
        return value

    @validates('event_id')
    def validate_event_id(self, _, value):
        if not isinstance(value, int):
            raise ValueError('Event Id must be an integer.')
        return value

    user = db.relationship('User', back_populates='connections')
    event = db.relationship('Event', back_populates='connections')
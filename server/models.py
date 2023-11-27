from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db
from datetime import datetime

user_connections = db.Table(
    'user_connections',
    db.Column('user1_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('user2_id', db.Integer, db.ForeignKey('users.id'))
)

user_messages = db.Table(
    'user_messages',
    db.Column('user1_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('user2_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('user1_messages', db.String),
    db.Column('user2_messages', db.String),
    db.Column('created_at', db.DateTime, server_default=func.now())
)

user_events = db.Table(
    'user_events',
    db.Column('user1_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('user2_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('date', db.DateTime),
    db.Column('type', db.String),
    db.Column('location', db.String),
    db.Column('details', db.String),
    db.Column('status', db.String)
)

interests = db.Table(
    'interests',
    db.Column('type', db.DateTime),
    db.Column('name', db.String)
)


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())
    name = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    gender = db.Column(db.String, nullable=False)
    preference = db.Column(db.String, nullable=False)
    profile_picture = db.Column(db.String)
    location = db.Column(db.String, nullable=False)
    location_range = db.Column(db.Integer)
    bio = db.Column(db.String)
    interests = db.Column(db.String)
    swiped = db.Column(db.String)
    rejected = db.Column(db.String)

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

    @validates('gender')
    def validate_gender(self, _, value):
        genders = ['male', 'female', 'nonbinary']
        if not isinstance(value, str):
            raise Exception('Gender must be a string')
        elif value.lower() not in genders:
            raise Exception('Gender must be one of the approved types.')
        return value
    
    @validates('preference')
    def validate_preference(self, _, value):
        preferences = ['male', 'female', 'nonbinary']
        if not isinstance(value, str):
            raise Exception('Preference must be a string')
        elif value.lower() not in preferences:
            raise Exception('Gender must be one of the approved types.')
        return value

    @validates('profile_picture')
    def validate_profile_picture(self, _, value):
        pass

    connections = db.relationship('User',
        secondary = user_connections,
        primaryjoin = (user_connections.c.user1_id == id),
        secondaryjoin = (user_connections.c.user2_id == id),
        backref = 'connection'
    )

    messages = db.relationship('User',
        secondary = user_messages,
        primaryjoin = (user_messages.c.user1_id == id),
        secondaryjoin = (user_messages.c.user2_id == id),
        backref = 'message'
    )

    events = db.relationship('User',
        secondary = user_events,
        primaryjoin = (user_events.c.user1_id == id),
        secondaryjoin = (user_events.c.user2_id == id),
        backref = 'event'
    )
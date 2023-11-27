from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db
from datetime import datetime


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())
    name = db.Column(db.String, nullable=False)
    age = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    gender = db.Column(db.String, nullable=False)
    preference = db.Column(db.String, nullable=False)
    profile_picture = db.Column(db.String)
    location = db.Column(db.String, nullable=False)
    location_range = db.Column(db.Integer)
    bio = db.Column(db.String)
    interests = db.Column(db.String)

    sent_requests = db.relationship('Request', back_populates='sender_id')
    received_requests = db.relationship('Request', back_populates='receiver_id')

    sent_connections = db.relationship('Connection', back_populates='user1_id')
    received_connections = db.relationship('Connection', back_populates='user2_id')

    sent_messages = db.relationship('Message', back_populates='user1_messages')
    received_messages = db.relationship('Message', back_populates='user2_messages')

    hosted_events = db.relationship('Event', 'user1_id')
    guest_events = db.relationship('Event', 'user2_id')

class Request(db.Model, SerializerMixin):
    __tablename__ = 'requests'

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    status = db.Column(db.String)

class Connection(db.Model, SerializerMixin):
    __tablename__ = 'connections'

    id = db.Column(db.Integer, primary_key=True)
    user1 = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user2 = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

class Message(db.Model, SerializerMixin):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=func.now())

    user1_messages = db.relationship('User', 'sent_messages')
    user2_messages = db.relationship('User', 'received_messages')

class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=func.now())
    user1 = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user2 = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String, nullable=False)
    details = db.Column(db.String)
    status = db.Column(db.String, nullable=False)
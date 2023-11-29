from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt
from datetime import datetime

user_connections = db.Table(
    'user_connections',
    db.Column('user1', db.Integer, db.ForeignKey('users.id')),
    db.Column('user2', db.Integer, db.ForeignKey('users.id'))
)

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

    connection = db.relationship(
        'User', lambda: user_connections,
        primaryjoin=lambda: User.id == user_connections.c.user1,
        secondaryjoin=lambda: User.id == user_connections.c.user2,
        backref = 'connected'
    )

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

class Connection(db.Model, SerializerMixin):
    __tablename__ = 'connections'

    id = db.Column(db.Integer, primary_key=True)
    user1_id = db.Column(db.Integer)
    user2_id = db.Column(db.Integer)

class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    user1_id = db.Column(db.Integer)
    user2_id = db.Column(db.Integer)
    date = db.Column(db.String)
    time = db.Column(db.String)
    location = db.Column(db.String)
    details = db.Column(db.String)

class Conversation(db.Model, SerializerMixin):
    __tablename__ = 'conversations'

    id = db.Column(db.Integer, primary_key=True)
    user1_id = db.Column(db.Integer)
    user2_id = db.Column(db.Integer)
    body = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=func.now())
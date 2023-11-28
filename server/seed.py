#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc


# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Connection

if __name__ == '__main__':
    fake = Faker()

    def create_users():
        users = []
        for n in range(20):
            new_user = User(
                name = fake.first_name(),
                age = randint(18, 90),
                email = fake.email(),
                _password_hash = 'password',
                gender = rc(['male', 'female', 'nonbinary']),
                preference = rc(['male', 'female', 'nonbinary']),
                profile_picture = '',
                location = fake.zipcode(),
                location_range = randint(1, 200),
                bio = fake.sentence()
            )
            users.append(new_user)
            
        db.session.add_all(users)
        db.session.commit()

        connections = []
        for n in range(20):
            new_connection = Connection(user1_id=randint(1, 20), user2_id=randint(1, 20))
            connections.append(new_connection)
        
        db.session.add_all(connections)
        db.session.commit()


    with app.app_context():
        print("Starting seed...")
        # Seed code goes here
        create_users()
        
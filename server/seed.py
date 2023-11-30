#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc


# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Connection, Event

if __name__ == '__main__':
    fake = Faker()

    def create_users():
        users = []
        for n in range(100):
            new_user = User(
                name = fake.first_name(),
                age = randint(18, 90),
                email = fake.email(),
                gender = rc(['male', 'female', 'nonbinary']),
                preference = rc(['male', 'female', 'nonbinary']),
                profile_picture = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fblank-profile-picture&psig=AOvVaw1c1M68k96PsFFD5PocPPmE&ust=1701390812723000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCJDBvOq86oIDFQAAAAAdAAAAABAE",
                location = fake.postcode(),
                location_range = randint(1, 200),
                bio = fake.sentence()
            )
            new_user.password_hash = 'password'
            users.append(new_user)
            
        db.session.add_all(users)
        db.session.commit()

    def create_events():
        events = []
        for n in range(20):
            new_event = Event(
                date = fake.date(),
                time = fake.time(),
                location = fake.address(),
                details = fake.sentence()
            )
            events.append(new_event)

        db.session.add_all(events)
        db.session.commit()

    def create_connections():
        connections = []
        for n in range(20):
            new_connection = Connection(user_id=randint(1, 20), event_id=randint(1, 20))
            connections.append(new_connection)
        
        db.session.add_all(connections)
        db.session.commit()


    with app.app_context():
        print("Starting seed...")
        # Seed code goes here
        create_users()
        create_events()
        create_connections()
        print("Seeding finished!")
        
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

        user1 = User(
            name = 'Robert',
            age = 24,
            email = 'robert@fis.com',
            gender = 'male',
            preference = 'female',
            profile_picture = 'https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            location = fake.zipcode(),
            location_range = randint(1, 100),
            bio = "Educated, with a passion for pushing boundaries in both life and learning. I'm an avid rock climber who loves the thrill of scaling new heights. My goals include publishing groundbreaking research and exploring the world's wonders. Whether it's a cozy night in with a good book or an adrenaline-fueled outdoor adventure, I'm game. Seeking someone who appreciates intellectual conversations and isn't afraid to join me on spontaneous escapades."
        )
        user1.password_hash = 'password'
        users.append(user1)

        user2 = User(
            name = 'Frank',
            age = 40,
            email = 'frank@fis.com',
            gender = 'male',
            preference = 'female',
            profile_picture = 'https://images.pexels.com/photos/845457/pexels-photo-845457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            location = fake.zipcode(),
            location_range = randint(1, 100),
            bio = "Tech enthusiast by day, hopeless romantic by night. I've achieved success in the fast-paced world of software development, but my heart belongs to the simple joys of life. From coding to cooking, I find pleasure in diverse interests. My goal is to build a meaningful connection with someone who values both deep conversations and random dance parties in the living room."
        )

        user2.password_hash = 'password'
        users.append(user2)

        user3 = User(
            name = 'Nick',
            age = 33,
            email = 'nick@fis.com',
            gender = 'male',
            preference = 'male',
            profile_picture = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            location = fake.zipcode(),
            location_range = randint(1, 100),
            bio = "Dedicated to fitness and personal growth, I've mastered the art of discipline in both the gym and life. Currently pursuing a degree in nutrition, I'm on a mission to help others lead healthier lives. My ideal day involves a morning run, a hearty meal, and an evening spent enjoying good company. Looking for a partner who shares a passion for wellness and values a strong, supportive relationship."
        )

        user3.password_hash = 'password'
        users.append(user3)

        user4 = User(
            name = 'Abe',
            age = 50,
            email = 'abe@fis.com',
            gender = 'nonbinary',
            preference = 'male',
            profile_picture = 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            location = fake.zipcode(),
            location_range = randint(1, 100),
            bio = "A creative spirit with a flair for art and design, I've turned my passion into a successful career. My days are filled with turning blank canvases into masterpieces, but I'm ready to share my world with someone special. Seeking a muse who appreciates the beauty in both the chaos and the calm, and is open to exploring galleries, trying new cuisines, and finding inspiration in everyday moments."
        )

        user4.password_hash = 'password'
        users.append(user4)

        user5 = User(
            name = 'Brian',
            age = 27,
            email = 'brian@fis.com',
            gender = 'male',
            preference = 'female',
            profile_picture = 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            location = fake.zipcode(),
            location_range = randint(1, 100),
            bio = "Committed to making the world a better place, I've dedicated my education to environmental science and sustainable living. Whether it's advocating for eco-friendly practices or exploring nature trails, I'm passionate about preserving our planet. My goals include creating positive change and building a future with someone who shares a similar vision. Looking for a partner who values kindness, has a love for the outdoors, and dreams of making a difference together."
        )

        user5.password_hash = 'password'
        users.append(user5)

        user6 = User(
            name = 'Ashlee',
            age = 32,
            email = 'ashlee@fis.com',
            gender = 'female',
            preference = 'female',
            profile_picture = 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            location = fake.zipcode(),
            location_range = randint(1, 100),
            bio = "Artist with a heart as colorful as my canvases. I find joy in expressing emotions through my artwork and spreading positivity. Currently pursuing a degree in psychology to better understand the intricacies of the human soul. Looking for a partner who appreciates creativity, values deep connections, and believes in the power of laughter to heal."
        )

        user6.password_hash = 'password'
        users.append(user6)

        user7 = User(
            name = 'Samantha',
            age = 42,
            email = 'sam@fis.com',
            gender = 'female',
            preference = 'female',
            profile_picture = 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            location = fake.zipcode(),
            location_range = randint(1, 100),
            bio = " Lifelong learner with a penchant for exploring the world both intellectually and physically. Pursuing a career in international relations, my goal is to bridge gaps and foster understanding between cultures. When not buried in books, you'll find me on a spontaneous road trip or trying exotic cuisines. Seeking a like-minded soul who values meaningful conversations and is up for an adventure."
        )

        user7.password_hash = 'password'
        users.append(user7)

        user8 = User(
            name = 'Mandy',
            age = 27,
            email = 'mandy@fis.com',
            gender = 'nonbinary',
            preference = 'female',
            profile_picture = 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            location = fake.zipcode(),
            location_range = randint(1, 100),
            bio = "Culinary enthusiast with dreams of owning a bustling food truck. Whether experimenting with new recipes or exploring hidden gems in the city, I'm always on the lookout for the next gastronomic adventure. Looking for someone who appreciates a well-cooked meal, shares a love for travel, and dreams of building a future where every day is a feast for the senses."
        )

        user8.password_hash = 'password'
        users.append(user8)

        user9 = User(
            name = 'Kim',
            age = 22,
            email = 'kim@fis.com',
            gender = 'female',
            preference = 'male',
            profile_picture = 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            location = fake.zipcode(),
            location_range = randint(1, 100),
            bio = "Fitness is my passion, and I believe in the power of a healthy mind and body. Currently working as a fitness instructor, I find fulfillment in helping others achieve their wellness goals. My ideal day involves a sunrise yoga session, a green smoothie, and unwinding with a good book. Seeking a partner who values health, enjoys an active lifestyle, and believes in the importance of balance."
        )

        user9.password_hash = 'password'
        users.append(user9)

        user10 = User(
            name = 'Monica',
            age = 37,
            email = 'monica@fis.com',
            gender = 'female',
            preference = 'female',
            profile_picture = 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            location = fake.zipcode(),
            location_range = randint(1, 100),
            bio = "Building a sustainable future is my mission. I've combined my love for the environment with entrepreneurial spirit to create eco-friendly products. Whether attending green events or hiking in nature reserves, I'm dedicated to leaving a positive impact. Looking for a partner who shares a passion for environmental consciousness, dreams of making a difference, and values building a life that aligns with our values."
        )

        user10.password_hash = 'password'
        users.append(user10)

        db.session.add_all(users)
        db.session.commit()

    with app.app_context():
        print("Starting seed...")
        # Seed code goes here
        create_users()
        
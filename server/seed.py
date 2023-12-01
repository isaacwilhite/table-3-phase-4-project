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
            location = 'Portland',
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
            location = 'Seattle',
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
            location = 'Los Angeles',
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
            location = 'San Diego',
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
            location = 'Denver',
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
            location = 'Atlanta',
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
            location = 'Houtson',
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
            location = 'Salt Lake',
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
            location = 'Austin',
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
            location = 'San Fransisco',
            bio = "Building a sustainable future is my mission. I've combined my love for the environment with entrepreneurial spirit to create eco-friendly products. Whether attending green events or hiking in nature reserves, I'm dedicated to leaving a positive impact. Looking for a partner who shares a passion for environmental consciousness, dreams of making a difference, and values building a life that aligns with our values."
        )

        user10.password_hash = 'password'
        users.append(user10)

        user11 = User(
            name = 'Bobby',
            age = 45,
            email = 'bobby@fis.com',
            gender = 'male',
            preference = 'female',
            profile_picture = 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            location = 'Miami',
            bio = "Passionate about exploring new places, trying exotic cuisines, and capturing moments through photography. I believe in the magic of spontaneous road trips, finding joy in the little things, and building a connection that goes beyond surface level. Looking for someone who shares a love for adventure, appreciates authenticity, and is ready for a journey filled with laughter and unforgettable memories."
        )

        user11.password_hash = 'password'
        users.append(user11)

        user12 = User(
            name = 'Amanda',
            age = 32,
            email = 'amanda@fis.com',
            gender = 'female',
            preference = 'male',
            profile_picture = 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            location = 'Pheonix',
            bio = "A book lover with a penchant for quoting Shakespeare at inappropriate times. I find solace in art galleries, thrive on deep conversations about life's mysteries, and have an inexplicable love for rainy days. Seeking a partner who values intellectual connections, appreciates the beauty in simplicity, and is ready to embark on a journey of self-discovery and shared dreams."
        )

        user12.password_hash = 'password'
        users.append(user12)

        user13 = User(
            name = 'Billy',
            age = 65,
            email = 'billy@fis.com',
            gender = 'male',
            preference = 'female',
            profile_picture = 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            location = 'Dallas',
            bio = "Fitness enthusiast by day, Netflix binger by night. My weekends are a mix of outdoor adventures and cozy movie nights with a good bowl of popcorn. I value kindness, genuine connections, and a sense of humor that can turn an ordinary day into an extraordinary one. Hoping to find someone who shares a passion for staying active, appreciates a good dad joke, and believes in the power of a strong emotional connection."
        )

        user13.password_hash = 'password'
        users.append(user13)

        user14 = User(
            name = 'Lorraine',
            age = 28,
            email = 'lorraine@fis.com',
            gender = 'female',
            preference = 'female',
            profile_picture = 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            location = 'Chicago',
            bio = "Aspiring chef with a love for experimenting in the kitchen and creating culinary masterpieces. I believe in the beauty of vulnerability, open communication, and building a relationship based on trust and shared values. Seeking a partner who appreciates good food, enjoys lazy Sunday mornings, and is ready to embark on a delicious journey of love and companionship"
        )

        user14.password_hash = 'password'
        users.append(user14)

        user15 = User(
            name = 'Marcus',
            age = 24,
            email = 'marcus@fis.com',
            gender = 'male',
            preference = 'male',
            profile_picture = 'https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            location = 'Rome',
            bio = "Eternal optimist with a contagious smile and a love for spreading positivity. I enjoy exploring hidden gems in the city, practicing mindfulness through yoga, and indulging in a good cup of coffee. Looking for a partner who sees the beauty in life's simple pleasures, values kindness and empathy, and is ready to build a future filled with laughter, love, and endless adventures."
        )

        user15.password_hash = 'password'
        users.append(user15)

        user16 = User(
            name = 'Rose',
            age = 43,
            email = 'rose@fis.com',
            gender = 'female',
            preference = 'female',
            profile_picture = 'https://images.pexels.com/photos/1197132/pexels-photo-1197132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            location = 'Madrid',
            bio = "Artistic soul with a passion for painting, writing, and immersing myself in creative endeavors. I believe in the power of deep connections, the importance of personal growth, and the joy of finding beauty in unexpected places. Searching for a kindred spirit who appreciates the arts, values authenticity, and is ready to explore the canvas of life together"
        )

        user16.password_hash = 'password'
        users.append(user16)

        user17 = User(
            name = 'Anthony',
            age = 47,
            email = 'anthony@fis.com',
            gender = 'male',
            preference = 'female',
            profile_picture = 'https://images.pexels.com/photos/733500/pexels-photo-733500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            location = 'London',
            bio = "Tech geek by day, nature enthusiast by weekend. I find joy in both coding marathons and hiking trails, and I'm always up for a debate about the latest advancements in science and technology. Seeking a partner who shares a love for intellectual conversations, appreciates the wonders of the great outdoors, and is ready to embark on a journey of continuous learning and shared discoveries."
        )

        user17.password_hash = 'password'
        users.append(user17)

        user18 = User(
            name = 'Maria',
            age = 22,
            email = 'maria@fis.com',
            gender = 'female',
            preference = 'male',
            profile_picture = 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            location = 'Paris',
            bio = "Adventurous spirit with a love for adrenaline-fueled activities and spontaneous road trips. I thrive on pushing boundaries, seeking new experiences, and living life to the fullest. Looking for a thrill-seeker who enjoys the rush of adventure, values authenticity, and is ready to explore the world hand in hand, creating a story worth telling."
        )

        user18.password_hash = 'password'
        users.append(user18)

        user19 = User(
            name = 'Antoine',
            age = 32,
            email = 'antoine@fis.com',
            gender = 'male',
            preference = 'female',
            profile_picture = 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            location = 'Tokyo',
            bio = "Animal lover and aspiring world traveler with a soft spot for rescue dogs and a passion for exploring diverse cultures. I believe in the transformative power of kindness, the joy of a good belly laugh, and the beauty of building a connection that withstands the test of time. Seeking a partner who shares a love for furry companions, values compassion, and is ready for a lifetime of shared adventures and heartwarming moments."
        )

        user19.password_hash = 'password'
        users.append(user19)

        user20 = User(
            name = 'Martha',
            age = 41,
            email = 'martha@fis.com',
            gender = 'nonbinary',
            preference = 'female',
            profile_picture = 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            location = 'Dubia',
            bio = "Musician with a love for creating soulful melodies and connecting with others through the universal language of music. I believe in the healing power of a well-played song, the magic of late-night jam sessions, and the importance of building a relationship rooted in mutual respect and shared passions. Hoping to find a music lover who appreciates the rhythm of life and is ready to compose a harmonious love story together."
        )

        user20.password_hash = 'password'
        users.append(user20)

        user21 = User(
            name = 'Derek',
            age = 33,
            email = 'derek@fis.com',
            gender = 'nonbinary',
            preference = 'male',
            profile_picture = 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            location = 'Vancover',
            bio = "Foodie at heart with a love for exploring local eateries, mastering new recipes, and savoring the diverse flavors of the world. I believe in the joy of shared meals, the warmth of a home-cooked dinner, and the magic of building a connection through a mutual love for good food. Seeking a partner who appreciates culinary adventures, values quality time, and is ready to embark on a delicious journey of love and laughter"
        )

        user21.password_hash = 'password'
        users.append(user21)

        user22 = User(
            name = 'Samara',
            age = 19,
            email = 'samara@fis.com',
            gender = 'nonbinary',
            preference = 'female',
            profile_picture = 'https://images.pexels.com/photos/458766/pexels-photo-458766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            location = 'Las Vegas',
            bio = "Environmental advocate on a mission to make a positive impact on the planet. Whether participating in eco-friendly initiatives or exploring nature reserves, I'm dedicated to living a sustainable lifestyle. Looking for a partner who shares a passion for environmental consciousness, dreams of making a difference, and values building a life that aligns with our shared values."
        )

        user22.password_hash = 'password'
        users.append(user22)

        user23 = User(
            name = 'Shaheed',
            age = 28,
            email = 'shaheed@fis.com',
            gender = 'nonbinary',
            preference = 'male',
            profile_picture = 'https://images.pexels.com/photos/819530/pexels-photo-819530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            location = 'Detroit',
            bio = "Film buff with a love for cinematic adventures, from classic masterpieces to hidden indie gems. I find joy in dissecting plot twists, attending film festivals, and indulging in movie marathons. Seeking a fellow cinephile who appreciates the magic of storytelling, values intellectual conversations, and is ready to create our own epic love story."
        )

        user23.password_hash = 'password'
        users.append(user23)

        user24 = User(
            name = 'Mary Lou',
            age = 25,
            email = 'marylou@fis.com',
            gender = 'female',
            preference = 'male',
            profile_picture = 'https://images.pexels.com/photos/594421/pexels-photo-594421.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            location = 'Moscow',
            bio = "Fitness fanatic with a love for challenging workouts, outdoor runs, and the pursuit of a healthy lifestyle. I believe in the power of self-improvement, the joy of breaking personal records, and the importance of building a relationship that encourages growth and well-being. Hoping to find a fitness partner who shares a dedication to health, values support and encouragement, and is ready to sweat, smile, and succeed together."
        )

        user24.password_hash = 'password'
        users.append(user24)

        user25 = User(
            name = 'Douglas',
            age = 44,
            email = 'douglas@fis.com',
            gender = 'male',
            preference = 'female',
            profile_picture = 'https://images.pexels.com/photos/262391/pexels-photo-262391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            location = 'Baltimore',
            bio = "Travel enthusiast with a passion for exploring the world, immersing myself in different cultures, and collecting passport stamps. I believe in the transformative power of travel, the joy of spontaneous adventures, and the beauty of building a connection with someone who shares a love for exploration. Seeking a travel companion who appreciates the thrill of discovering new destinations and is ready to embark on a journey of a lifetime."
        )

        user25.password_hash = 'password'
        users.append(user25)

        user26 = User(
            name = 'Katie',
            age = 22,
            email = 'katie@fis.com',
            gender = 'female',
            preference = 'female',
            profile_picture = 'https://images.pexels.com/photos/1090387/pexels-photo-1090387.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            location = 'Kansas City',
            bio = "Tech-savvy professional by day, aspiring chef by night. I find joy in both coding challenges and experimenting with new recipes in the kitchen. Seeking a partner who appreciates a well-crafted algorithm as much as a perfectly cooked meal, values intellectual conversations, and is ready to create a life that balances the excitement of innovation with the warmth of shared meals."
        )

        user26.password_hash = 'password'
        users.append(user26)

        user27 = User(
            name = 'Nikiwe',
            age = 24,
            email = 'nikiwe@fis.com',
            gender = 'female',
            preference = 'male',
            profile_picture = 'https://images.pexels.com/photos/871495/pexels-photo-871495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            location = 'Nashville',
            bio = "Art lover with a passion for creating and appreciating beauty in all its forms. Whether visiting galleries or spending hours immersed in my own artistic endeavors, I believe in the power of self-expression and the joy of building a connection rooted in creativity. Looking for a fellow artist or art enthusiast who values authenticity, appreciates the beauty in imperfection, and is ready to paint a canvas of love and shared dreams."
        )

        user27.password_hash = 'password'
        users.append(user27)

        user28 = User(
            name = 'Aurora',
            age = 27,
            email = 'aurora@fis.com',
            gender = 'female',
            preference = 'male',
            profile_picture = 'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            location = 'Memphis',
            bio = "Fitness enthusiast and nature lover with a love for early morning hikes, yoga sessions, and finding peace in the great outdoors. I believe in the importance of a healthy mind and body, the joy of mindful living, and the beauty of building a relationship that values well-being and shared adventures. Seeking a partner who shares a dedication to health, values balance, and is ready to embark on a journey of fitness, fun, and fulfillment together."
        )

        user28.password_hash = 'password'
        users.append(user28)

        user29 = User(
            name = 'Brenda',
            age = 32,
            email = 'brenda@fis.com',
            gender = 'female',
            preference = 'male',
            profile_picture = 'https://images.pexels.com/photos/1903611/pexels-photo-1903611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            location = 'Beijing',
            bio = "Bookworm with a passion for getting lost in fictional worlds, attending literary events, and discovering hidden bookshops. I believe in the magic of storytelling, the joy of sharing favorite reads, and the beauty of building a connection with someone who appreciates the written word. Seeking a fellow bibliophile who values intellectual conversations, appreciates the power of a well-written story, and is ready to create our own chapter of love and adventure."
        )

        user29.password_hash = 'password'
        users.append(user29)

        user30 = User(
            name = 'Jonathan',
            age = 35,
            email = 'jonathan@fis.com',
            gender = 'male',
            preference = 'female',
            profile_picture = 'https://images.pexels.com/photos/886285/pexels-photo-886285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            location = 'Honolulu',
            bio = "Ambitious professional with a love for personal growth, continuous learning, and setting and achieving goals. I believe in the importance of a growth mindset, the joy of pursuing passions, and the beauty of building a relationship that encourages and supports individual aspirations. Seeking a partner who shares a commitment to personal development, values mutual support, and is ready to embark on a journey of success, happiness, and shared achievements together."
        )

        user30.password_hash = 'password'
        users.append(user30)

        db.session.add_all(users)
        db.session.commit()

    with app.app_context():
        print("Starting seed...")
        # Seed code goes here
        create_users()
        
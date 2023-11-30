#!/usr/bin/env python3

# Remote library imports
from flask import Flask, request, make_response, session, jsonify
from flask_restful import Resource, Api
import ipdb
from flask_socketio import SocketIO, emit
# Local imports
from config import app, db, api

# Add your model imports
from models import User, Connection, Event, ChatMessage, user_connections
import os, secrets
from dotenv import load_dotenv
from sqlalchemy import text

load_dotenv()
app.secret_key = os.environ.get("APP_SECRET")
socketio = SocketIO(app, cors_allowed_origins="*")
# Views go here!

class ChatManager:
    @staticmethod
    def connection_exists(user1_id, user2_id):
        connection = user_connections.query.filter(
            (user_connections.c.user1 == user1_id) & (user_connections.c.user2 == user2_id)
        ).first()

        if connection:
            return f"{min(user1_id, user2_id)}_{max(user1_id, user2_id)}"
        else:
            return None

    @staticmethod
    def are_connected(user1_id, user2_id):
        connection = user_connections.query.filter(
            ((user_connections.c.user1 == user1_id) & (user_connections.c.user2 == user2_id)) |
            ((user_connections.c.user1 == user2_id) & (user_connections.c.user2 == user1_id))
        ).first()

        return connection is not None


chat_manager = ChatManager()


class CurrentUser(Resource):
    def get(self):
        try:
            user_id = session['current_user']
            selected = User.query.get(user_id)
            return make_response(selected.to_dict(rules=('-_password_hash',)), 200)
        except Exception:
            return make_response({"Error": "User does not exist."}, 404)

class CreateUser(Resource):
    def post(self):
        try:
            new_data = request.get_json()
            new_item = User(
                id = None,
                created_at = None,
                updated_at = None,
                name = '',
                age = 0,
                email = new_data['email'],
                _password_hash = '',
                gender = '',
                preference = '',
                profile_picture = '',
                location = '',
                bio = '',
            )
            new_item.password_hash = new_data['password']
            db.session.add(new_item)    
            db.session.commit()
            session['current_user'] = new_item.id
            return make_response(new_item.to_dict(rules=('-_password_hash',)), 201)
        except:
            db.session.rollback()
            return make_response({'Error' : 'Could not create new user.'}, 400)

class LoginUser(Resource):
    def post(self):
        email = request.get_json()['email']
        password = request.get_json()['password']
        selected = User.query.filter_by(email=email).first()
        if not selected or not selected.authenticate(password):
            return make_response({"Error" : "Invalid credentials."}, 422)
        
        session['current_user'] = selected.id
        return selected.to_dict(rules=('-_password_hash', '-connections.user', '-events.users')), 200
    
class LogoutUser(Resource):
    def get(self):
        session['current_user'] = None
        return make_response({}, 200)
    
class Users(Resource):
    def get(self):
        try:
            users = [user.to_dict(rules=('-_password_hash',)) for user in User.query]
            return make_response(users, 200)
        except Exception as e:
            return make_response({'Error' : 'Could not fetch user data.'}, 400)
    
    def post(self):
        try:
            new_data = request.get_json()
            new_item = User(**new_data)
            db.session.add(new_item)    
            db.session.commit()
            return make_response(new_item.to_dict(), 201)
        except ValueError:
            db.session.rollback()
            return make_response({'Error' : 'Could not create new data'}, 400)

class UsersById(Resource):
    def get(self, id):
        try:
            selected = db.session.get(User, id)
            return make_response(selected.to_dict(rules=('-_password_hash',)), 200)
        except Exception:
            return make_response({"Error": "User does not exist."}, 404)
        
    def patch(self, id):
        if selected := db.session.get(User, id):
            try:
                new_data = request.get_json()
                for k in new_data:
                    if new_data[k] == '' or new_data[k] == 0:
                        continue
                    setattr(selected, k, new_data[k])
                db.session.add(selected)
                db.session.commit()
                return make_response(selected.to_dict(rules=('-_password_hash',)), 202)
            except Exception:
                db.session.rollback()
                return make_response({'Error' : 'Unable to update user.'}, 400)
        return make_response({"Error": "User does not exist."}, 404)

    def delete(self, id):
        if selected := db.session.get(User, id):
            try:
                db.session.delete(selected)
                db.session.commit()
                return make_response({}, 204)
            except Exception:
                db.session.rollback()
                return make_response({'Error' : 'Unable to delete user.'}, 400)
        return make_response({"Error": "User does not exist."}, 404)
    
class MakeConnection(Resource):
    def post(self):
        try:
            new_data = request.get_json()
            new_item = Connection(**new_data)
            
            db.session.add(new_item)    
            db.session.commit()
            return make_response(new_item.to_dict(), 201)
        except ValueError as e:
            print(e)
            db.session.rollback()
            return make_response({'Error' : 'Could not create new connection.'}, 400)


class UserConnections(Resource):
    def get(self, id):
        try:
            results = [connection.to_dict() for connection in Connection.query if connection.user_id == id]
            return make_response(results, 200)
        except Exception:
            return make_response({'Error' : 'Could not fetch user connections.'}, 400)
        
    def delete(self, id):
        if selected := db.session.get(Connection, id):
            try:
                db.session.delete(selected)
                db.session.commit()
                return make_response({'Message' : 'Connection has been deleted.'}, 204)
            except Exception:
                db.session.rollback()
                return make_response({'Error' : 'Unable to delete connection.'}, 400)
        return make_response({"Error": "Connection does not exist."}, 404)

class MakeEvent(Resource):
    def post(self):
        try:
            new_data = request.get_json()
            new_item = Event(**new_data)
            db.session.add(new_item)    
            db.session.commit()
            return make_response(new_item.to_dict(), 201)
        except ValueError:
            db.session.rollback()
            return make_response({'Error' : 'Could not create new event.'}, 400)
        
class UserEvents(Resource):
    def get(self, id):
        try:
            results = [item.to_dict() for item in User.query.get(id).events if item != None]
            return make_response(results, 200)
        except Exception as e:
            print(e)
            return make_response({'Error' : 'Could not fetch user events.'}, 400)
        
    def delete(self, id):
        if selected := db.session.get(Event, id):
            try:
                db.session.delete(selected)
                db.session.commit()
                return make_response({'Message' : 'Event has been deleted.'}, 204)
            except Exception:
                db.session.rollback()
                return make_response({'Error' : 'Unable to delete event.'}, 400)
        return make_response({"Error": "Event does not exist."}, 404)

class HandleSwipe(Resource):
    def post(self):
        try:
            swipe_data = request.get_json()
            sender_id = swipe_data['sender']
            receiver_id = swipe_data['receiver']

            sender = User.query.get(sender_id)
            receiver = User.query.get(receiver_id)
            
            if receiver not in sender.pending_sent_connections:
                sender.pending_sent_connections.append(receiver)
                db.session.commit()
                
                if sender in receiver.pending_sent_connections:
                    db.session.execute(text(f"UPDATE user_connections set status = 'accepted' WHERE (user1={sender_id} AND user2={receiver_id})"))
                    db.session.execute(text(f"UPDATE user_connections set status = 'accepted' WHERE (user1={receiver_id} AND user2={sender_id})"))
                    db.session.commit()

        except Exception as e:
            print(e)
            db.session.rollback()
            raise Exception('Unable to process swipe.')

class MutualSwipes(Resource):
    def get(self):
        current_id = session['current_user']
        try:
            users = db.session.execute(text(f"SELECT * FROM user_connections WHERE user1 = {current_id} OR user1 = {current_id}")).fetchall()
            filtered = [tup[1] for tup in users if tup[2] == 'accepted']
            self_removed = [id for id in filtered if id != current_id]
            results = []

            for id in self_removed:
                results.append(User.query.get(id).to_dict())

            return make_response(results, 200)
        except Exception as e:
            return make_response({'Error' : 'Could not fetch user data.'}, 400)
        
@socketio.on('message')
def handle_message(data):
    sender_id = data['sender_id']
    receiver_id = data['receiver_id']
    content = data['content']

    # Check if users are connected before sending the message
    if chat_manager.are_connected(sender_id, receiver_id):
        # Store the message in the database
        message = ChatMessage(sender_id=sender_id, receiver_id=receiver_id, content=content)
        db.session.add(message)
        db.session.commit()

        # Broadcast the message to the respective users in their unique room
        room_name = chat_manager.connection_exists(sender_id, receiver_id)
        emit('message', data, room=room_name)
    else:
        emit('error', {'message': 'Users are not connected'}, room=sender_id)

@socketio.on('joinRoom')
def handle_join_room(data):
    user_id = data.get('userId')
    other_user_id = data.get('otherUserId')

    room = f"{min(user_id, other_user_id)}-{max(user_id, other_user_id)}"
    
    socketio.join_room(room)


api.add_resource(CurrentUser, '/current')
api.add_resource(LoginUser, '/login')
api.add_resource(CreateUser, '/signup')
api.add_resource(LogoutUser, '/logout')
api.add_resource(Users, '/users')
api.add_resource(UsersById, '/users/<int:id>')
api.add_resource(MakeConnection, '/connections')
api.add_resource(UserConnections, '/connections/<int:id>')
api.add_resource(MakeEvent, '/events')
api.add_resource(UserEvents, '/events/<int:id>')
api.add_resource(HandleSwipe, '/swipe')
api.add_resource(MutualSwipes, '/mutualswipes')

if __name__ == '__main__':
    socketio.run(app, debug=True, port=5555)
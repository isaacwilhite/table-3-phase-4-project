#!/usr/bin/env python3

# Remote library imports
from flask import Flask, request, make_response, session
from flask_restful import Resource, Api
import ipdb

# Local imports
from config import app, db, api

# Add your model imports
from models import User, Connection, Event
import os, secrets
from dotenv import load_dotenv

load_dotenv()
app.secret_key = os.environ.get("APP_SECRET")

# Views go here!

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
                _password_hash = new_data['password'],
                gender = '',
                preference = '',
                profile_picture = '',
                location = '',
                location_range = 0,
                bio = '',
                interests = '',
                swiped = '',
                rejected = ''
            )
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
        return selected.to_dict(rules=('-_password_hash',))
    
class LogoutUser(Resource):
    def get(self):
        session['current_user'] = None
        return make_response({}, 200)
    
class Users(Resource):
    def get(self):
        try:
            users = [user.to_dict() for user in User.query]
            return make_response(users, 200)
        except Exception:
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
            return make_response(selected.to_dict(), 200)
        except Exception:
            return make_response({"Error": "User does not exist."}, 404)
        
    def patch(self, id):
        if selected := db.session.get(User, id):
            try:
                new_data = request.get_json()
                for k in new_data:
                    setattr(selected, k, new_data[k])
                db.session.add(selected)
                db.session.commit()
                return make_response(selected.to_dict(), 202)
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
        except ValueError:
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
            results = [event.to_dict() for event in Event.query if event.user_id == id]
            return make_response(results, 200)
        except Exception:
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

api.add_resource(LoginUser, '/login')
api.add_resource(CreateUser, '/signup')
api.add_resource(LogoutUser, '/logout')
api.add_resource(Users, '/users')
api.add_resource(UsersById, '/users/<int:id>')
api.add_resource(MakeConnection, '/connections')
api.add_resource(UserConnections, '/connections/<int:id>')
api.add_resource(MakeEvent, '/events')
api.add_resource(UserEvents, '/events/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
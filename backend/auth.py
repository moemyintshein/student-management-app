from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from models import user_dict, hash_password, verify_password
import os

auth_bp = Blueprint('auth', __name__)
client = MongoClient(os.environ.get('MONGO_URI', 'mongodb://mongo:27017/student_db'))
db = client['student_db']
users = db.users

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.json
    if users.find_one({"email": data["email"]}):
        return jsonify({"error": "Email already registered"}), 400
    data["password"] = hash_password(data["password"])
    users.insert_one(user_dict(data))
    return jsonify({"message": "Signup successful"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = users.find_one({"email": data["email"]})
    if user and verify_password(user['password'], data["password"]):
        return jsonify({"message": "Login successful", "is_admin": user.get("is_admin", False)}), 200
    return jsonify({"error": "Invalid credentials"}), 401
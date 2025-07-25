from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from models import student_dict
import os

student_bp = Blueprint('student', __name__)
client = MongoClient(os.environ.get('MONGO_URI', 'mongodb://mongo:27017/student_db'))
db = client['student_db']
students = db.students

@student_bp.route('/', methods=['POST'])
def create_student():
    data = request.json
    students.insert_one(student_dict(data))
    return jsonify({"message": "Student created"}), 201

@student_bp.route('/', methods=['GET'])
def get_students():
    result = [student for student in students.find({}, {'_id': 0})]
    return jsonify(result), 200

@student_bp.route('/<email>', methods=['GET'])
def get_student(email):
    student = students.find_one({"email": email}, {'_id': 0})
    if student:
        return jsonify(student), 200
    return jsonify({"error": "Student not found"}), 404

@student_bp.route('/<email>', methods=['PUT'])
def update_student(email):
    data = request.json
    students.update_one({"email": email}, {"$set": student_dict(data)})
    return jsonify({"message": "Student updated"}), 200

@student_bp.route('/<email>', methods=['DELETE'])
def delete_student(email):
    students.delete_one({"email": email})
    return jsonify({"message": "Student deleted"}), 200
from werkzeug.security import generate_password_hash, check_password_hash

def student_dict(data):
    return {
        "name": data.get("name"),
        "dob": data.get("dob"),
        "nrc": data.get("nrc"),
        "father_name": data.get("father_name"),
        "email": data.get("email"),
        "phone": data.get("phone"),
        "addresses": data.get("addresses"),
        "photo": data.get("photo", ""),
    }

def user_dict(data):
    return {
        "email": data.get("email"),
        "password": data.get("password"),
        "is_admin": data.get("is_admin", False)
    }

def hash_password(password):
    return generate_password_hash(password)

def verify_password(password_hash, password):
    return check_password_hash(password_hash, password)
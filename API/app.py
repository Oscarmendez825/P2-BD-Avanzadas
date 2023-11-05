import re

from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)

# Habilita CORS para todas las rutas de la aplicación
CORS(app)

# Configurar la conexión a MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["proyectoBases"]
collection = db["usuarios"]


# Ruta para obtener todos los documentos
@app.route('/api/documentos', methods=['GET'])
def get_all_documents():
    documentos = collection.find({})
    response = []
    for documento in documentos:
        documento['_id'] = str(documento['_id'])  # Convertir ObjectId a string
        response.append(documento)
    return jsonify(response)


# Ruta para crear un nuevo documento
@app.route('/api/documentos', methods=['POST'])
def create_document():
    data = request.json
    result = collection.insert_one(data)
    return jsonify({'_id': str(result.inserted_id)}), 201

# Ruta para registrar un usuario
@app.route('/usuario', methods=['POST'])
def registrar_usuario():
    data = request.get_json()
    print(data)
    fullName = data['fullName']
    email = data['email']
    password = data['password']
    position = data['position']

    # Validar el rol del usuario (colaborador o administrador)
    if position not in ['collaborator', 'administrator']:
        return jsonify({'mensaje': 'Rol de usuario no válido'}), 400

    usuarios = db['usuarios']

    # Verificar si el correo ya está registrado
    usuario_existente = usuarios.find_one({'email': email})
    if usuario_existente:
        return jsonify({'mensaje': 'Correo ya registrado'}), 409

    # Registrar al usuario en la base de datos
    nuevo_usuario = {
        'fullName': fullName,
        'email': email,
        'password': password,
        'position': position
    }
    usuarios.insert_one(nuevo_usuario)

    return jsonify({'mensaje': 'Usuario registrado con éxito'}), 201

@app.route('/usuario/login', methods=['POST'])
def validar_usuario():
    data = request.get_json()
    email = data['email']
    password = data['password']

    usuarios = db['usuarios']

    # Verificar si el correo ya está registrado
    usuario_existente = usuarios.find_one({'email': email})
    if usuario_existente:
        if usuario_existente['password'] == password:
            return jsonify({'mensaje': 'Usuario válido'}), 200
        else:
            return jsonify({'mensaje': 'Contraseña incorrecta'}), 400
    else:
        return jsonify({'mensaje': 'Correo no registrado'}), 400

# Iniciar la aplicación
if __name__ == '__main__':
    app.run(debug=True)

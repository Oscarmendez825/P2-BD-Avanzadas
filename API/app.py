from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)

# Habilita CORS para todas las rutas de la aplicación
CORS(app)

# Opcional: Configura opciones CORS personalizadas
cors = CORS(app, resources={
    r"/api/*": {
        "origins": "https://dominio-permitido.com",
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": ["Authorization"],
    }
})

# Configurar la conexión a MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["proyectoBases"]
collection = db["users"]


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
    fullName = data['fullName']
    email = data['email']
    password = data['password']
    position = data['position']

    # Validar el rol del usuario (colaborador o administrador)
    if role not in ['colaborador', 'administrador']:
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

@app.route('/validar', methods=['GET'])
def validar_usuario(email, password):
    # Verificar que el correo tenga un formato válido
    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return False, "El correo no es válido"

    return True, "Usuario válido"

# Iniciar la aplicación
if __name__ == '__main__':
    app.run(debug=True)

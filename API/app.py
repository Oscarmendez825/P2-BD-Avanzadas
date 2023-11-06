import json
import re
from datetime import datetime

from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS
from bson import json_util, ObjectId

app = Flask(__name__)

# Habilita CORS para todas las rutas de la aplicación
CORS(app)

# Configurar la conexión a MongoDB
client = MongoClient("mongodb://localhost:30001/?directConnection=true&serverSelectionTimeoutMS=2000")
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
    if position not in ['collaborator', 'admin']:
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
            # devolver el usuario
            return json.loads(json_util.dumps(usuario_existente)), 200
        else:
            return jsonify({'mensaje': 'Contraseña incorrecta'}), 400
    else:
        return jsonify({'mensaje': 'Correo no registrado'}), 400


@app.route('/solicitud', methods=['POST'])
def solicitar_viaje():
    data = request.json

    full_name = data.get('fullName')
    position = data.get('position')
    department = data.get('department')
    international = data.get('international')
    destination_country = data.get('destinationCountry')
    trip_purpose = data.get('tripPurpose')
    start_date = data.get('startDate')
    end_date = data.get('endDate')
    airline = data.get('airline')
    ticket_price = data.get('ticketPrice')
    accommodation = data.get('accommodation')
    requires_transport = data.get('requiresTransport')
    email = data.get('email')
    status = "Pendiente"  # Valor predeterminado: Pendiente

    solicitud = {
        'fullName': full_name,
        'position': position,
        'department': department,
        'international': international,
        'destinationCountry': destination_country,
        'tripPurpose': trip_purpose,
        'startDate': start_date,
        'endDate': end_date,
        'airline': airline,
        'ticketPrice': ticket_price,
        'accommodation': accommodation,
        'requiresTransport': requires_transport,
        'status': status,
        'email': email
    }

    solicitudes = db['solicitudes']
    solicitudes.insert_one(solicitud)

    return jsonify({'mensaje': 'Solicitud de viaje enviada con éxito'}), 201


@app.route('/solicitud/usuario/<email>', methods=['GET'])
def obtener_solicitudes_usuario(email):
    # Verificar que el correo tenga un formato válido
    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return jsonify({'mensaje': "El correo no es válido"}), 400

    solicitudes = db['solicitudes']
    resultado = solicitudes.find({'email': email})

    # Convertir el resultado de MongoDB a JSON
    return json.loads(json_util.dumps(resultado)), 200

@app.route('/solicitud/<id>', methods=['GET'])
def obtener_solicitud(id):
    solicitudes = db['solicitudes']
    try:
        # Convertir el ID de string a ObjectId
        object_id = ObjectId(id)
    except:
        return jsonify({'mensaje': "ID no válido"}), 400

    resultado = solicitudes.find_one({'_id': object_id})

    # Si no se encuentra ninguna solicitud con el ID proporcionado
    if resultado is None:
        return jsonify({'mensaje': "No se encontró la solicitud con el ID proporcionado"}), 404

    # Convertir el resultado de MongoDB a JSON
    return json.loads(json_util.dumps(resultado)), 200


@app.route('/solicitud/<id>', methods=['PUT'])
def actualizar_solicitud(id):
    data = request.json

    # Verificar que el ID tenga un formato válido
    try:
        # Convertir el ID de string a ObjectId
        object_id = ObjectId(id)
    except:
        return jsonify({'mensaje': "ID no válido"}), 400

    # Verificar que el ID exista
    solicitudes = db['solicitudes']
    resultado = solicitudes.find_one({'_id': object_id})
    if resultado is None:
        return jsonify({'mensaje': "No se encontró la solicitud con el ID proporcionado"}), 404

    #remove _id from data
    data.pop('_id', None)

    # Actualizar la solicitud
    solicitudes.update_one({'_id': object_id}, {'$set': data})

    return jsonify({'mensaje': "Solicitud actualizada con éxito"}), 200


@app.route('/solicitud/<id>', methods=['DELETE'])
def eliminar_solicitud(id):
    # Verificar que el ID tenga un formato válido
    try:
        # Convertir el ID de string a ObjectId
        object_id = ObjectId(id)
    except:
        return jsonify({'mensaje': "ID no válido"}), 400

    # Verificar que el ID exista
    solicitudes = db['solicitudes']
    resultado = solicitudes.find_one({'_id': object_id})
    if resultado is None:
        return jsonify({'mensaje': "No se encontró la solicitud con el ID proporcionado"}), 404

    # Eliminar la solicitud
    solicitudes.delete_one({'_id': object_id})

    return jsonify({'mensaje': "Solicitud eliminada con éxito"}), 200


@app.route('/solicitud/pendientes', methods=['GET'])
def obtener_solicitudes_pendientes():
    solicitudes = db['solicitudes']
    resultado = solicitudes.find({'status': 'Pendiente'})

    # Convertir el resultado de MongoDB a JSON
    return json.loads(json_util.dumps(resultado)), 200


@app.route('/solicitud/internacionales/<quarter>/<year>', methods=['GET'])
def obtener_solicitudes_internacionales(quarter, year):
    solicitudes = db['solicitudes']
    try:
        quarter = int(quarter)
        year = int(year)
    except:
        return jsonify({'mensaje': "Trimestre o año no válido"}), 400
    # Definir el rango de fechas para el trimestre
    if quarter == 1:
        start_date = datetime(year, 1, 1)
        end_date = datetime(year, 3, 31)
    elif quarter == 2:
        start_date = datetime(year, 4, 1)
        end_date = datetime(year, 6, 30)
    elif quarter == 3:
        start_date = datetime(year, 7, 1)
        end_date = datetime(year, 9, 30)
    elif quarter == 4:
        start_date = datetime(year, 10, 1)
        end_date = datetime(year, 12, 31)
    else:
        return jsonify({'mensaje': "Trimestre no válido"}), 400

    # Filtrar las solicitudes que son internacionales y que caen dentro del rango de fechas
    query = {
        'international': True,
        'startDate': {'$gte': start_date.strftime('%Y-%m-%d')},
        'endDate': {'$lte': end_date.strftime('%Y-%m-%d')},
        'status': 'Aprobada'
    }
    resultado = solicitudes.find(query)

    # Convertir el resultado de MongoDB a JSON
    return json.loads(json_util.dumps(resultado)), 200


@app.route('/solicitud/destino', methods=['GET'])
def obtener_destinos():
    solicitudes = db['solicitudes']
    resultado = solicitudes.find({}, {'destinationCountry': 1})

    # Convertir el resultado de MongoDB a JSON
    return json.loads(json_util.dumps(resultado)), 200


@app.route('/solicitud/destino/<destino>', methods=['GET'])
def obtener_solicitudes_destino(destino):
    solicitudes = db['solicitudes']
    resultado = solicitudes.find({'destinationCountry': destino})

    # Convertir el resultado de MongoDB a JSON
    return json.loads(json_util.dumps(resultado)), 200


@app.route('/solicitud/mes/<date>', methods=['GET'])
def obtener_solicitudes_mes(date):
    # http://localhost:5000/solicitud/mes/{2023-01}
    solicitudes = db['solicitudes']
    try:
        date = datetime.strptime(date, '%Y-%m')
    except:
        return jsonify({'mensaje': "Fecha no válida"}), 400

    # Filtrar las solicitudes que caen dentro del mes
    query = {
        'startDate': {'$gte': date.strftime('%Y-%m-01')},
        'endDate': {'$lte': date.strftime('%Y-%m-31')},
        'status': 'Aprobada'
    }
    resultado = solicitudes.find(query)

    # Convertir el resultado de MongoDB a JSON
    return json.loads(json_util.dumps(resultado)), 200



# Iniciar la aplicación
if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, jsonify, request
from pymongo import MongoClient

# Inicializar Flask
app = Flask(__name__)

# Configurar la conexión a MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["mi_base_de_datos"]  # Reemplaza con el nombre de tu base de datos
collection = db["mi_coleccion"]  # Reemplaza con el nombre de tu colección


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


# Iniciar la aplicación
if __name__ == '__main__':
    app.run(debug=True)

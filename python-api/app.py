from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(
    app, support_credentials=True, resources={r"*": {"origins": "*"}}
)  # Esto habilitará CORS para todos los dominios en todas las rutas
# También, permitirá todas las solicitudes de cualquier origen
# Configuración de la base de datos
db_config = {"host": "db", "user": "root", "password": "root", "database": "todolist"}


@app.route("/")
def home():
    return "Servidor Flask funcionando..."


@app.route("/leer", methods=["GET"])
def leer():

    with mysql.connector.connect(**db_config) as conn:
        with conn.cursor(dictionary=True) as cursor:
            cursor.execute("SELECT * FROM item")
            items = cursor.fetchall()
    return jsonify(items)


@app.route("/grabar", methods=["POST"])
def grabar():
    datos = request.json  # Obtiene los datos enviados en la solicitud POST
    nombre = datos.get("nombre")
    fuerza = datos.get("fuerza")

    with mysql.connector.connect(**db_config) as conn:
        with conn.cursor() as cursor:
            consulta = "INSERT INTO item (nombre, fuerza) VALUES (%s, %s)"
            cursor.execute(consulta, (nombre, fuerza))
            conn.commit()  # Es importante hacer commit de la transacción

    return jsonify({"success": True, "mensaje": "Tarea añadida correctamente"})


@app.route("/borrar/<int:id_personaje>", methods=["DELETE"])
def borrar(id_personaje):
    with mysql.connector.connect(**db_config) as conn:
        with conn.cursor() as cursor:
            consulta = "DELETE FROM item WHERE id = %s"
            cursor.execute(consulta, (id_personaje,))
            conn.commit()

    return jsonify({"success": True, "mensaje": "Tarea eliminada correctamente"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

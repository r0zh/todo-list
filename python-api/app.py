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
    return jsonify({"items": items, "status": 1})


@app.route("/grabar", methods=["POST"])
def grabar():
    datos = request.json  # Obtiene los datos enviados en la solicitud POST
    name = datos.get("name")
    position = datos.get("position")
    status = datos.get("status")

    with mysql.connector.connect(**db_config) as conn:
        with conn.cursor() as cursor:
            consulta = "INSERT INTO item (name, position, status) VALUES (%s, %s, %s)"
            cursor.execute(consulta, (name, position, status))
            conn.commit()  # Es importante hacer commit de la transacción

    return jsonify({"success": True, "mensaje": "Tarea añadida correctamente"})


@app.route("/borrar/<int:item_id>", methods=["DELETE"])
def borrar(item_id):
    with mysql.connector.connect(**db_config) as conn:
        with conn.cursor() as cursor:
            consulta = "DELETE FROM item WHERE id = %s"
            cursor.execute(consulta, (item_id,))
            conn.commit()

    return jsonify({"success": True, "mensaje": "Tarea eliminada correctamente"})


@app.route("/actualizar/<int:item_id>", methods=["PUT"])
def actualizar(item_id):
    datos = request.json
    name = datos.get("name")
    position = datos.get("position")
    status = datos.get("status")

    with mysql.connector.connect(**db_config) as conn:
        with conn.cursor() as cursor:
            consulta = (
                "UPDATE item SET name = %s, status = %s, position = %s WHERE id = %s"
            )
            cursor.execute(consulta, (name, status, position, item_id))
            conn.commit()
    return jsonify({"success": True, "mensaje": "Tarea actualizada correctamente"})


@app.route("/random", methods=["GET"])
def random():
    with mysql.connector.connect(**db_config) as conn:
        with conn.cursor(dictionary=True) as cursor:
            cursor.execute("SELECT * FROM item ORDER BY RAND() LIMIT 1")
            item = cursor.fetchone()
    return jsonify({"item": item, "status": 1})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

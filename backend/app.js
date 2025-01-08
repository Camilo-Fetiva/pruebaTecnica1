// IMPORTAR LAS DEPENDENCIAS
import express from 'express'; //importar express para la prueba en la terminal
import dotenv from 'dotenv'; //Dependencia para manejar variables de entorno
import { connectionMongo } from './src/config/dataBase.js'; // dependencia para conectar la base de datos


// CONFIGURAR EL USO DEL SERVIDOR CON MONGO
const app = express();
dotenv.config();
const port = process.env.PORT;


app.use(express.json()); //USAR JSON PARA LAS PETICIONES


// INVOACR LA BASE DE DATOS DE MONGO
connectionMongo();

// EJECTUTAR EL PROYECTO EN EL PC
app.listen(port, () => {
    console.log ('Soy el server ejecutandose correctamente en el puerto ', port);
});
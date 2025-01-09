// IMPORTAR LAS DEPENDENCIAS
import express, { json } from 'express'; //importar express para la prueba en la terminal
import dotenv from 'dotenv'; //Dependencia para manejar variables de entorno
import { connectionMongo } from './src/config/database.js'; // dependencia para conectar la base de datos
import { userRouter } from './src/routes/users.routes.js';
import {loginRouter} from './src/routes/login.routes.js';

// Dependencia para la conexion con el frontend
import cors from 'cors';


// CONFIGURAR EL USO DEL SERVIDOR CON MONGO
const app = express();
dotenv.config();
const port = process.env.PORT;
app.use(cors()); // <- Uso para utilizar el backend en el navegador

// RUTA DE LOS USUARIOS
app.use(express.json());
app.use('/usuarios', userRouter);
app.use ('/login', loginRouter);



// INVOACR LA BASE DE DATOS DE MONGO
connectionMongo();

// EJECTUTAR EL PROYECTO EN EL PC
app.listen(port, () => {
    console.log ('Soy el server ejecutandose correctamente en el puerto', port);
});
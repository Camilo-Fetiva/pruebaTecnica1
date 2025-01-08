// CREAR LAS RUTAS

// IMPORTAR LOS CONTROLADORES
import { postUser, getUser, deleteUserById, putUserById } from "../controllers/user.controller.js";
import express from 'express';


// Configurar el router de Express
export const userRouter = express.Router();

// Crear la rutas para las peticiones de los productos

// POST
userRouter.post ('/crear', postUser);

// GET
userRouter.get ('/obtener', getUser);

// PUT
userRouter.put ('/actualizar/:id', putUserById);

// DELETE
userRouter.delete ('/eliminar/:id',deleteUserById);
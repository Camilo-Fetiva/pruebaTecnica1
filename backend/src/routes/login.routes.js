// IMPORTAR MODULOS Y DEPENDENCIAS
import { loginUser } from "../services/login.services.js";
import express from 'express';

// ROUTER DE EXPRESS
export const loginRouter = express.Router();

// PETICION POST
loginRouter.post('/', loginUser);
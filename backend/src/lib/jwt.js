// IMPORTAR MODULOS Y DEPENDENCIAS
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// FUNCION DEL DOTENV
dotenv.config();

// CLAVE SECRETA CREADA EN EL ARCHIVO .ENV
const key = process.env.SECRET_KEY;

// FUNCIONES PARA GENERAR Y VERIFICAR EL TOKEN

// GENERAR
export function generateToken(payload){
    return new Promise((resolve, reject) => {
        jwt.sign(payload, key, {expiresIn: '1h'}, (error, token)=>{
            if(error){
                reject (new Error('Error al generar token ' + error.message));
            }else{
                resolve(token);
            }
        });
    });
}

// VERIFICAR
export function verifyToken(token){
    return new Promise((resolve, reject) => {
        jwt.verify(token, key, (error, decoded)=>{
            if(error){
                reject (new Error('Error al generar JWT ' + error.message));
            }else{
                resolve(decoded);
            }
        });
    });
}
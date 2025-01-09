// ARCHIVO PARA LA LOGICA NECESARIO DE LOS INICIOS DE SESION DE LOS USUARIOS

// IMPORTAR MODULOS Y DEPENDENCIAS
import { userModel } from "../models/users.js";
import { generateToken } from "../lib/jwt.js";
import bcrypt from 'bcryptjs';

// FUNCION
export async function loginUser(request, response){
    // MANEJO DE ERRORES
    try {
        // VALIDACION = CORREO
        const {emailLogin, passwordLogin} = request.body;

        // VALIDACION usuario existe
        let userFound = await userModel.findOne({
            Correo: emailLogin,
        });


        // QUE OCURRE SI NO SE ENCUENTRA EL EMAIL EN LA BASE DE DATOS
        if(!userFound){
            return response.status(404).json({mensaje: 'Usuario no encontrado'});
        }
        
        // VALIDACION DE LA CONTRASENA -> comparar la contrasena

        let isValidPassword = await bcrypt.compare(passwordLogin, user.Contrasena);
        

        // QUE OCURRE SI LA CONTRASENA ES INCORRECTA
        if(!isValidPassword){
            return response.status(401).json({mensaje: 'Contraseña invalida'});
        };

        // VERIFICAR EL ROL Y LOS PERMISOS DEL USUARIO
        const payload = {
            id: user._id,
            name: user.nameUser,
        }

        // GENERAR EL TOKEN
        const token = await generateToken(payload);

        // TODO CORRECTO
        return response.status(200).json({
            mensaje: 'Inicio de sesion existoso', 
            token
        });

    } catch (error) {
        return response.status(400).json({
            mensaje: 'Inicio de sesion incorrecto',
            error: error.message || error
        });
    }
}
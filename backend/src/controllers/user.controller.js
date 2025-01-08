// IMPORTAR DEPENDENCIAS
import { userModel } from "../models/users.js";
import bcrypt from "bcryptjs";

// LOGICA DE PETICIONES

// POST
export const postUser = async (request, response) =>{
    try {
        const {Nombre, Correo, Contrasena} = request.body;

        const codedPassword = await bcrypt.hash(Contrasena, 10);
        const newUser = await userModel.create({Nombre, Correo, Contrasena:codedPassword});

        return response.status(201).json({
            mensaje: "Usuario creado satisfactoriamente",
            datos: newUser
        });
        
    } catch (error) {
        return response.status(400).json({
            mensaje: 'Error al crear un usuario',
            problema: error.message
        });
    }
}

// GET
export const getUser = async (request, response) => {

    // Logica de la peticion GET
    try {
        let users = await userModel.find() //Encontrar los usuarios

        if(users.length === 0){
            return response.status(200).json({
                mensaje : 'No hay usuarios',
            });
        }

        return response.status(200).json({
            mensaje :'Estos son los usuarios encontrados',
            datos: users
        });

    } catch (error) { 
        return response.status(400).json({
            mensaje: 'Error al mostrar los usuarios',
            problema: error || error.message
        });
    }
}

// PUT
export const putUserById = async (request, response) => {

    try {
        let idForPut = request.params.id; //Parametro ID del producto a actualizar
        let dataForUpdate = request.body; // Informacion actualizada

        const userUpdated = await userModel.findByIdAndUpdate(idForPut, dataForUpdate); // Parametro del ID  y luego parametro de la info actualizada

        // Validacion cuando el ID no es correcto o no existe
        // !productUpdated -> significa la negacion de una variable (ESTA VACIA O LA CONDICIONS ES FALSA)
        if(!userUpdated){
            return response.status(404).json ({
                mensaje: "No se encontro un usuario para actualizar"
            });
        }

        return response.status(200).json({
            mensaje: "Se actualizo el usuario correctamente",
            datos: userUpdated
        })

    } catch (error) {
        return response.status(400).json({
            mensaje: "Ocurrio un error al actualizar el usuario",
            problem: error || error.message
        });
    }
}

// DELETE
export const deleteUserById = async (request, response) => {

    try {
        let idForDelete = request.params.id;
        await userModel.findByIdAndDelete(idForDelete); //Encotrar el producto por ID y eliminarlo
        return response.status(200).json({
            mensaje: "Usuario eliminado satisfactoriamente" //Mensaje que se da al eliminar un rpodcuto
        });


    } catch (error) {
        return response.status(400).json({
            mensaje: "Ocurrio un error al eliminar el usuario",
            problem: error || error.message
        });
    }
}
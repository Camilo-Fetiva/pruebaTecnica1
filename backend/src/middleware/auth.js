// IMPORTAR LAS DEPENDENCIAS
import { verifyToken } from "../lib/jwt";

// FUNCION
export function authToken(requieredRole){
    return async (request, response, next) => { //next-> Middleware

    // VERIFICACIONES
        // 1.Existencia
        let token = request.headers['authorization']; // Accediendo al token
    
        if (!token) {
            return response.status(401).json({
                mensaje: 'No se puede acceder al contenido'
            });
        }

        // 2. Token permitido
        token = token.split(' ')[1];

        // 3. Verificacion de errores 
       try {
        const decoded = await verifyToken(token);
        console.log (decoded);

        // Guardar la informacion decodificada en la peticion
        request.user = decoded;

       } catch (error) {
        return response.status(400).json({
            mensaje: "Ocurrio un error al verificar el acceso",
            problem:  error.message
        });
       }

    //Continuar con el siguiente proceso
    next();
    }
};

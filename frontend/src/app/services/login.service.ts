// EN ESTE SERVICIO SE GENERA LA LOGICA PARA LA GESTION DEL INICIO DE SESION

// INYECTAR -> inject para las dependencias
import { Injectable, inject } from '@angular/core';

// Importar el protocolo HTTP
import { HttpClient } from '@angular/common/http';

// Importar el Router para poder navegar en el aplicativo
import { Router } from '@angular/router';


// Importar la dependencia que decodifica el token
import { jwtDecode, JwtDecodeOptions } from "jwt-decode";

// Importar la INTERFAZ conectada al servicio de login
import { Login } from '../interfases/login';

// Importar las RUTAS
import { routes } from '../app.routes';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // Inyectar las dependencias (PRIVATE OR PUBLIC)
  private _httpClient = inject (HttpClient); //Varialble para el HTTP
  private _router = inject (Router); //Varialble para el Router

  // Ruta de conexion con el backend (VARIABLE DE ENTORNO)
  private URL_LOGIN = 'http://localhost:3000/login'; //Esta ruta parte del backend para el inicio de sesion del usuario

  // LOGICA PARA LAS PETICIONES
  // 1. Inicio de sesion (PETICION POST)
  inicioSesion(credencialesIngreso: Login){
    // PETICION POST
    return this._httpClient.post(this.URL_LOGIN, credencialesIngreso)
  };

  // 2. Obtener el token
  // Token -> Se almacenan de forma local (TEMPORAL) LocalStorage
  obtenerToken(){
    return localStorage.getItem('token'); //Si existe token -> Inicio de sesion exitoso
  };

  // 4. Redireccionar al panel de control o al pag de inicio
  redireccionar(){
    
    this._router.navigate(['/']);
  }

  // 5. Inicio de sesion satisfactorio
  isLoged(){
    return this.obtenerToken()? true : false;
  }

  // 6. Cierre de sesion
  logOut(){

    // Eliminar el token del local storage
    localStorage.removeItem('token');
    // redireccionar
    this._router.navigate(['/']);
  }
}
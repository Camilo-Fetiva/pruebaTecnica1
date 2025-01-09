import { Injectable, inject } from '@angular/core';

// HTTP
import { HttpClient } from '@angular/common/http';

// INTERFAZ DE USUARIOS
import { Users } from '../interfases/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

 // INYECCION EL CLIENTE
 private _httpClient = inject(HttpClient);

 // RUTA DE CONEXION CON EL BACKEND
 private URL_USERS = 'http://localhost:3000/usuarios'; //404 no esta creado

 // PETICIONES

 // PETICION POST
 postUsers(user: Users){
   return this._httpClient.post(this.URL_USERS + '/crear', user);
 };

 // PETICION GET
 getUsers(){
   return this._httpClient.get(this.URL_USERS + '/obtener');
 };

}

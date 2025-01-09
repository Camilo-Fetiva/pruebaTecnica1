import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

// INTERFASES
import { Users } from '../../interfases/users';
// SERVICIOS
import { UsersService } from '../../services/users.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-form-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './form-register.component.html',
  styleUrl: './form-register.component.css'
})
export class FormRegisterComponent {
  _users = inject(UsersService);
  _router = inject(Router);

  allUsers : Users[]=[];
  
  Nombre: string = '';
  Correo: string = '';
  Contrasena: string = '';

  // PETICION POST (CREAR)
  crearUsuarios(){
    if(this.Nombre === '' || this.Correo === '' || this.Contrasena === ''){
    }else{
      this._router.navigate(['/']);
      alert('Bienvenido a la Aventura ' + this.Nombre)
      const nuevoUsuario: Users ={
         Nombre : this.Nombre,
         Correo : this.Correo,
         Contrasena: this.Contrasena
      };

      this._users.postUsers(nuevoUsuario).subscribe({
        next: (res:any) =>{
          alert(res.mensaje)
        },
        error: (error: any) =>{
          // Cuando sale incorrecto
          console.log(error)
        }
      });
    };
  };

  ngOnInit(){
    this.crearUsuarios();
  };
}

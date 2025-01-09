import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

// IMPORTAR EL MODELO DE DATOS
import { UsersService } from '../../services/users.service';

// IMPORTAR LAS INTERFASES
import { Users } from '../../interfases/users';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css'
})
export class FormLoginComponent {
  // // INJECT
  _router = inject(Router);
  _users = inject(UsersService);

  // // INFORMACION OBTENIDA DEL FORMULARIO
  formLogin = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  // // Almacenar usuarios obtenidos de la base de datos
  allUsers: Users[] = [];
  Correo: string = '';
  Contrasena: string = '';

  // // Datos de prueba
  admin = {
    Correo: "ecoclosetAdmin",
    Contrasena: "ecocloset",
    Nombre: 'Camilo',
  };

  // // Función para obtener los usuarios desde la base de datos
  obtenerUsuarios() {
    this._users.getUsers().subscribe({
      next: (res: any) => {
        this.allUsers = res.datos;
        console.log(this.allUsers);
      },
      error: (error: any) => {
        console.error('Error al obtener los usuarios', error);
        alert('Error al obtener los usuarios');
      }
    });
  }

  // // Función de inicio de sesión
  iniciarSesion() {
    // Verificar si los campos están vacíos
    if (!this.Correo || !this.Contrasena) {
      alert('Por favor ingresa tu correo y contraseña');
      return;
    }

  //   // Verificar si es el inicio de sesión del administrador
    if (this.Correo === this.admin.Correo && this.Contrasena === this.admin.Contrasena) {
      // Redirigir al panel de administración
      alert('Bienvenido a la Aventura ' + this.admin.Nombre);
      this._router.navigate(['/']);
      return;
    }

  //   // VERIFICAR SI ES USUARIO
    const usuarioEncontrado = this.allUsers.find(user => user.Correo === this.formLogin.value.email);

    if (usuarioEncontrado) {
      // El usuario fue encontrado
      console.log('Usuario encontrado:', usuarioEncontrado);
    } else {
      // El usuario no fue encontrado
      console.log('Correo no registrado');
    }
  }

}

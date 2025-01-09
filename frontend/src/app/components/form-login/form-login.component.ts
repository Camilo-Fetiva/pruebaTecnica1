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
  // INJECT
  _router = inject(Router);
  _users = inject(UsersService);

  // INFORMACION OBTENIDA DEL FORMULARIO
  formLogin = new FormGroup({
    Correo: new FormControl(''),
    Contrasena: new FormControl(''),
  });

  // Almacenar usuarios obtenidos de la base de datos
  allUsers: Users[] = [];

  ngOnInit() {
    // Obtener los usuarios desde la base de datos
    this.obtenerUsuarios();
  }

  // Función para obtener los usuarios desde la base de datos
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

  // Función de inicio de sesión
  iniciarSesion() {
    const { Correo, Contrasena } = this.formLogin.value;  // Obtener los valores del formulario

    // Verificar si los campos están vacíos
    if (!Correo || !Contrasena) {
      alert('Por favor ingresa tu correo y contraseña');
      return;
    }

    // Verificar si es un usuario registrado
    const usuarioEncontrado = this.allUsers.find(user =>
      user.Correo.trim() === Correo.trim() &&
      user.Contrasena.trim() === Contrasena.trim()
    );

    console.log('Usuarios cargados:', this.allUsers);
    console.log('Usuario encontrado:', usuarioEncontrado);

    console.log('Informacion obtenida del input email: '+
      this.formLogin.value.Correo //<- Traer la variable creada y los valores dados y con el value se obtiene la info
    );

    console.log('Informacion obtenida del input password: '+
      this.formLogin.value.Contrasena
    );

    if (usuarioEncontrado) {
      alert('Bienvenido a la Aventura');
      this._router.navigate(['/']);
    } else {
      // El usuario no fue encontrado
      console.log('Correo o contraseña incorrectos');
      alert('Correo o contraseña incorrectos');
    }
  }

 

}

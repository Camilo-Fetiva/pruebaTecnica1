import { Routes } from '@angular/router';

// IMPORTAR RUTAS
import { FormLoginComponent } from './components/form-login/form-login.component';
import { FormRegisterComponent } from './components/form-register/form-register.component';

export const routes: Routes = [
    {path: 'Ingresar', component: FormLoginComponent, title: 'Login'},
    {path: 'Registrarse', component: FormRegisterComponent, title: 'Register'}
];

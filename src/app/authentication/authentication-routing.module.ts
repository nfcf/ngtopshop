import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages';
import { RegisterComponent } from './pages';


const authenticationChildren: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

const authenticationRoutes: Routes = [
  {
    path: '',
    children: authenticationChildren
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(authenticationRoutes)
  ],
  // exports: [RouterModule]
})
export class AuthenticationRoutingModule { }

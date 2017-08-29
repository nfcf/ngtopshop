import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages';
import { RegisterComponent } from './pages';

const authenticationRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(authenticationRoutes)
  ],
  // exports: [RouterModule]
})
export class AuthenticationRoutingModule { }

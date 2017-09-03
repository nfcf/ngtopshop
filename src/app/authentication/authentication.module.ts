import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ReCaptchaModule } from 'angular2-recaptcha';

import { AuthenticationRoutingModule } from './authentication-routing.module';

import { JasperoAlertsModule } from '@jaspero/ng2-alerts';

import { LoginComponent, RegisterComponent } from './pages';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,

    JasperoAlertsModule,
    ReCaptchaModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthenticationModule { }

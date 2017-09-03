import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { DialogModule, PanelModule, ButtonModule, InputTextModule } from 'primeng/primeng';

import { UsersRoutingModule } from './users-routing.module';

import { UsersComponent } from './pages';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    UsersRoutingModule,

    DialogModule,
    PanelModule,
    ButtonModule,
    InputTextModule
  ],
  declarations: [
    UsersComponent
  ],
  providers: [

  ]
})
export class UsersModule { }

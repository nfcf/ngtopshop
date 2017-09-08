import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { DialogModule, PanelModule, ButtonModule, InputTextModule, DropdownModule } from 'primeng/primeng';

import { UsersRoutingModule } from './users-routing.module';

import { UsersComponent } from './pages';
import { UserFormDialogComponent } from './components';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    UsersRoutingModule,

    DialogModule,
    PanelModule,
    ButtonModule,
    InputTextModule,
    DropdownModule
  ],
  declarations: [
    UsersComponent,
    UserFormDialogComponent
  ],
  providers: [

  ]
})
export class UsersModule { }

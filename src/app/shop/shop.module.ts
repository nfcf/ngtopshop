import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { DialogModule, PanelModule, ButtonModule, InputTextModule, InputTextareaModule } from 'primeng/primeng';

import { ShopRoutingModule } from './shop-routing.module';

import { ShopComponent } from './pages';
import { ProfileFormDialogComponent } from './components';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ShopRoutingModule,

    DialogModule,
    PanelModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule
  ],
  declarations: [
    ShopComponent,
    ProfileFormDialogComponent
  ],
  providers: [
  ]
})
export class ShopModule { }

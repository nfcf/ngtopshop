import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { DialogModule, PanelModule, ButtonModule, InputTextModule } from 'primeng/primeng';

import { OrdersRoutingModule } from './orders-routing.module';

import { OrdersComponent } from './pages';
import { OrdersService } from './services';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    OrdersRoutingModule,

    DialogModule,
    PanelModule,
    ButtonModule,
    InputTextModule
  ],
  declarations: [
    OrdersComponent
  ],
  providers: [
    OrdersService
  ]
})
export class OrdersModule { }

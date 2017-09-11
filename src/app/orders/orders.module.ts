import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { JasperoConfirmationsModule } from '@jaspero/ng2-confirmations';
import { DialogModule, PanelModule, ButtonModule, InputTextModule, DropdownModule } from 'primeng/primeng';

import { OrdersRoutingModule } from './orders-routing.module';

import { OrdersComponent } from './pages';
import { OrderFormDialogComponent } from './components';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    OrdersRoutingModule,

    JasperoConfirmationsModule,

    DialogModule,
    PanelModule,
    ButtonModule,
    InputTextModule,
    DropdownModule
  ],
  declarations: [
    OrdersComponent,
    OrderFormDialogComponent
  ],
  providers: [
  ]
})
export class OrdersModule { }

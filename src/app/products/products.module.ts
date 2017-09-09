import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { JasperoConfirmationsModule } from '@jaspero/ng2-confirmations';
import { DialogModule, PanelModule, ButtonModule, InputTextModule } from 'primeng/primeng';

import { ProductsRoutingModule } from './products-routing.module';

import { ProductsComponent } from './pages';
import { ProductFormDialogComponent } from './components';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ProductsRoutingModule,

    JasperoConfirmationsModule,

    DialogModule,
    PanelModule,
    ButtonModule,
    InputTextModule
  ],
  declarations: [
    ProductsComponent,
    ProductFormDialogComponent
  ],
  providers: [
  ]
})
export class ProductsModule { }

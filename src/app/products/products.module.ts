import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { DialogModule, PanelModule, ButtonModule, InputTextModule } from 'primeng/primeng';

import { ProductsRoutingModule } from './products-routing.module';

import { ProductsComponent } from './pages';
import { ProductService } from './services';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ProductsRoutingModule,

    DialogModule,
    PanelModule,
    ButtonModule,
    InputTextModule
  ],
  declarations: [
    ProductsComponent
  ],
  providers: [
    ProductService
  ]
})
export class ProductsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/primeng';

import { ProductsRoutingModule } from './products-routing.module';

import { ProductsComponent } from './pages';
import { ProductsService } from './services';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ProductsRoutingModule,

    DialogModule
  ],
  declarations: [
    ProductsComponent
  ],
  providers: [
    ProductsService
  ]
})
export class ProductsModule { }

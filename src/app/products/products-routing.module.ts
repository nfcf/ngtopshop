import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './pages';


const productsRoutes: Routes = [
  {
    path: '',
    component: ProductsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(productsRoutes)
  ],
  // exports: [RouterModule]
})
export class ProductsRoutingModule { }

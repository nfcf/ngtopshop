import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrdersComponent } from './pages';


const ordersRoutes: Routes = [
  {
    path: '',
    component: OrdersComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ordersRoutes)
  ],
  // exports: [RouterModule]
})
export class OrdersRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShopComponent } from './pages';


const shopRoutes: Routes = [
  {
    path: '',
    component: ShopComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(shopRoutes)
  ],
  // exports: [RouterModule]
})
export class ShopRoutingModule { }

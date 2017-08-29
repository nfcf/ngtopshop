import { RouteGuardService } from './shared/services/route-guard/route-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, Event, NavigationStart, NavigationEnd } from '@angular/router';


const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule',
    canActivate: [ RouteGuardService ],
    data: { routeKey: 'users'}
  },
  {
    path: 'products',
    loadChildren: './products/products.module#ProductsModule',
    canActivate: [ RouteGuardService ],
    data: { routeKey: 'products'}
  },
  {
    path: 'orders',
    loadChildren: './orders/orders.module#OrdersModule',
    canActivate: [ RouteGuardService ],
    data: { routeKey: 'orders'}
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfileModule',
    canActivate: [ RouteGuardService ],
    data: { routeKey: 'profile'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(public router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {

      } else if (event instanceof NavigationEnd) {

      }
    });
  }
}

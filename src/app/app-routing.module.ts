import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, Event, NavigationStart, NavigationEnd } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { RouteGuardService } from './shared/services/route-guard/route-guard.service';



const appRoutes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: './authentication/authentication.module#AuthenticationModule',
  },
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
    path: 'shop',
    loadChildren: './shop/shop.module#ShopModule',
    canActivate: [ RouteGuardService ],
    data: { routeKey: 'shop'}
  },
  { path: '**', component: PageNotFoundComponent }
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

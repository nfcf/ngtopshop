import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../index';
import * as _ from 'lodash';

import 'rxjs/add/operator/map';

@Injectable()
export class RouteGuardService implements CanActivate {
  private readonly ADMIN_ROUTES = ['products'];
  private readonly MANAGER_ROUTES = ['products'];
  private readonly USER_ROUTES = [];

  constructor(private router: Router, private authService: AuthService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authService.isAuthenticated()
      .map((isAuthenticated: boolean) => {
        if (!isAuthenticated) {
          this.router.navigateByUrl('/login');
        } else {
          const allowedRoutes = this.getAllowedRoutesForRole(this.authService.userProfile.role);
          return allowedRoutes.indexOf(route.data.routeKey) >= 0;
        }
      });
  }

  private getAllowedRoutesForRole(role: string): string[] {
    switch (role) {
      case 'admin':
        return this.ADMIN_ROUTES;
      case 'manager':
        return this.MANAGER_ROUTES;
      case 'user':
      default:
        return this.USER_ROUTES;
    }
  }

}

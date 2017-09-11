import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { State, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../index';
import { User } from '../../models';
import * as _ from 'lodash';
import * as RouterActions from 'app/state/actions/router.actions';
import * as SessionActions from 'app/state/actions/session.actions';
import * as fromRoot from 'app/state/reducers';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';

@Injectable()
export class RouteGuardService implements CanActivate {
  private readonly ADMIN_ROUTES = ['products', 'users', 'orders'];
  private readonly MANAGER_ROUTES = ['products', 'orders'];
  private readonly USER_ROUTES = ['shop', 'orders'];

  constructor(private store: Store<fromRoot.State>, private authService: AuthService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authService.isAuthenticated().mergeMap(
      (isAuthenticated: boolean) => {
        if (!isAuthenticated) {
          this.store.dispatch(new RouterActions.Go({ path: ['auth/login'] }));
          return Observable.of(false);
        } else {
          return this.authService.getCurrentUser().map(
            (user: User) => {
              const allowedRoutes = this.getAllowedRoutesForRole(user.role);
              return user.active && allowedRoutes.indexOf(route.data.routeKey) >= 0;
            }
          );
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

import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { State, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../index';
import { UserProfile } from '../../models';
import * as _ from 'lodash';
import * as RouterActions from 'app/store/actions/router.actions';
import * as UserProfileActions from 'app/store/actions/user-profile.actions';
import * as fromRoot from 'app/store/reducers';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/zip';

@Injectable()
export class RouteGuardService implements CanActivate {
  private readonly ADMIN_ROUTES = ['products'];
  private readonly MANAGER_ROUTES = ['products'];
  private readonly USER_ROUTES = [];

  constructor(private store: Store<fromRoot.State>, private authService: AuthService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return Observable.zip(
        this.authService.isAuthenticated(),
        this.authService.getUserProfile())
      .map((authAndProfile: [boolean, UserProfile]) => {
        if (!authAndProfile[0]) {
          this.store.dispatch(new RouterActions.Go({ path: ['auth/login'] }));
          return false;
        } else {
          const allowedRoutes = this.getAllowedRoutesForRole(authAndProfile[1].role);
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

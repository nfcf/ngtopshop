import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import * as UserActions from 'app/state/actions/user.actions';
import * as OrderActions from 'app/state/actions/order.actions';
import * as ProductActions from 'app/state/actions/product.actions';
import * as fromRoot from 'app/state/reducers';
import { AuthService } from 'app/shared/services';
import { User } from 'app/shared/models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showMenu: boolean;
  currentUser: User;

  constructor(
    private router: Router,
    private store: Store<fromRoot.State>,
    private authService: AuthService) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
    });

    this.store.dispatch(new ProductActions.ListRequest());
    this.store.dispatch(new OrderActions.ListRequest());
    this.store.dispatch(new UserActions.ListRequest());

    this.router.events.subscribe((route) => {
      if (route instanceof NavigationEnd) {
        this.showMenu = route.url !== '/' && route.url.indexOf('auth') < 0;
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}

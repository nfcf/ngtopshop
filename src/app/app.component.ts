import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
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

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
    });

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

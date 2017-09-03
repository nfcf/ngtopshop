import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showMenu: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((route) => {
      if (route instanceof NavigationEnd) {
        this.showMenu = route.url.indexOf('auth') < 0;
      }
    });
  }
}

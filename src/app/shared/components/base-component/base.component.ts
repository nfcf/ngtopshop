import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';


export class BaseComponent implements OnDestroy {

  subscriptions: Subscription[] = [];

  constructor() {
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.forEach((sub: Subscription) => {
        sub.unsubscribe();
      });
      this.subscriptions.length = 0;
    }
  }
}

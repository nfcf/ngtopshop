import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Order } from 'app/shared/models';
import { DbService } from './../../../shared/services';
import { UUID } from 'angular2-uuid';

import * as firebase from 'firebase/app';
import 'rxjs/add/operator/filter';


@Injectable()
export class OrderService {

  constructor(private dbService: DbService) {}

  list(): Observable<Order[]> {
    return this.dbService.list(DbService.DB_ORDERS_REF).map((items: any[]) => {
      items = items.filter((item) => { return item.active; });
      items.forEach((item: any) => {
        item.id = item.$key;
      });
      return items;
    });
  }

  set(data: Order): Observable<Order> {
    const uid = data.$key || UUID.UUID();
    data = JSON.parse(JSON.stringify(data));
    delete data.$key;
    return this.dbService.set(DbService.DB_ORDERS_REF, uid, data);
  }

  update(data: Order): Observable<boolean> {
    const uid = data.$key || UUID.UUID();
    data = JSON.parse(JSON.stringify(data));
    delete data.$key;
    return this.dbService.update(DbService.DB_ORDERS_REF, uid, data);
  }

  delete(data: Order): Observable<boolean> {
    data.active = false;
    return this.update(data);
  }

}

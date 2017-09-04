import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Order } from 'app/shared/models';
import { DbService } from './../../../shared/services';
import { UUID } from 'angular2-uuid';

import * as firebase from 'firebase/app';


@Injectable()
export class OrdersService {

  constructor(private dbService: DbService) {}

  set(data: Order): Observable<Order> {
    const uid = data.$key || UUID.UUID();
    delete data.$key;
    return this.dbService.set(DbService.DB_ORDERS_REF, uid, data);
  }

  list(): Observable<Order[]> {
    return this.dbService.list(DbService.DB_ORDERS_REF);
  }

  update(data: Order): Observable<boolean> {
    const uid = data.$key || UUID.UUID();
    delete data.$key;
    return this.dbService.update(DbService.DB_ORDERS_REF, uid, data);
  }

  delete(data: Order): Observable<boolean> {
    const uid = data.$key;
    return this.dbService.delete(DbService.DB_ORDERS_REF, uid);
  }

}

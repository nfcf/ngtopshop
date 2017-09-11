import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Product } from 'app/shared/models';
import { DbService } from './../../../shared/services';
import { UUID } from 'angular2-uuid';

import * as firebase from 'firebase/app';
import 'rxjs/add/operator/filter';


@Injectable()
export class ProductService {

  constructor(private dbService: DbService) {}

  set(data: Product): Observable<Product> {
    const uid = data.$key || UUID.UUID();
    data = JSON.parse(JSON.stringify(data));
    delete data.$key;
    return this.dbService.set(DbService.DB_PRODUCTS_REF, uid, data);
  }

  list(): Observable<Product[]> {
    return this.dbService.list(DbService.DB_PRODUCTS_REF, {
      query: {
        orderByChild: 'active',
        equalTo: true
      }
    }).map((items: any[]) => {
      items.forEach((item: any) => {
        item.id = item.$key;
      });
      return items;
    });
  }

  update(data: Product): Observable<boolean> {
    const uid = data.$key || data.id || UUID.UUID();
    data = JSON.parse(JSON.stringify(data));
    delete data.$key;
    return this.dbService.update(DbService.DB_PRODUCTS_REF, uid, data);
  }

  delete(data: Product): Observable<boolean> {
    data.active = false;
    return this.update(data);
  }

}

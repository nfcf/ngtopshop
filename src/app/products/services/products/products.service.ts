import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { LocalStorageService } from 'ngx-store';
import { Product } from 'app/shared/models';
import { DbService } from './../../../shared/services';
import { UUID } from 'angular2-uuid';

import * as firebase from 'firebase/app';


@Injectable()
export class ProductsService {
  readonly DB_PRODUCTS_REF = '/products/';
  readonly DB_USERS_REF = '/users/';


  constructor(private dbService: DbService) {

  }


  set(data: Product): Observable<Product> {
    const uid = data.$key || UUID.UUID();
    delete data.$key;
    return this.dbService.set(DbService.DB_PRODUCTS_REF, uid, data);
  }

  list(): Observable<Product[]> {
    return this.dbService.list(DbService.DB_PRODUCTS_REF);
  }

  update(data: Product): Observable<boolean> {
    const uid = data.$key || UUID.UUID();
    delete data.$key;
    return this.dbService.update(DbService.DB_PRODUCTS_REF, uid, data);
  }

  delete(data: Product): Observable<Product[]> {
    const uid = data.$key;
    return this.dbService.delete(DbService.DB_PRODUCTS_REF, uid);
  }

}

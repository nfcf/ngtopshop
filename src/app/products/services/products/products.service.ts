import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { LocalStorageService } from 'ngx-store';
import { DbService } from './../../../shared/services';

import * as firebase from 'firebase/app';


@Injectable()
export class ProductsService {
  readonly DB_PRODUCTS_REF = '/products/';
  readonly DB_USERS_REF = '/users/';


  constructor(private dbService: DbService) {

  }


  set(uid: string, data: any): Observable<any> {
    return this.dbService.set(DbService.DB_PRODUCTS_REF, uid, data);
  }

  list(): Observable<any[]> {
    return this.dbService.list(DbService.DB_PRODUCTS_REF);
  }

  update(uid: string, data: any): Observable<boolean> {
    return this.dbService.update(DbService.DB_PRODUCTS_REF, uid, data);
  }

  delete(uid: string): Observable<any[]> {
    return this.dbService.delete(DbService.DB_PRODUCTS_REF, uid);
  }

}

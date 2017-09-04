import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import * as firebase from 'firebase/app';


@Injectable()
export class DbService {
  static readonly DB_PRODUCTS_REF = '/products/';
  static readonly DB_USERS_REF = '/users/';
  static readonly DB_ORDERS_REF = '/orders/';


  constructor(private afDatabase: AngularFireDatabase) {}


  set(pathOrRef: string, uid: string, data: any): Observable<any> {
    return Observable.create((observer: Observer<boolean>) => {
      this.afDatabase.object(pathOrRef + uid).set(data).then(() => {
        observer.next(true);
        observer.complete();
      }).catch((error: any) => {
        observer.error(error);
      });
    });
  }

  list(pathOrRef: string): Observable<any[]> {
    return this.afDatabase.list(pathOrRef).map((results: any[]) => {
      return results;
    });
  }

  update(pathOrRef: string, uid: string, data: any): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) => {
      this.afDatabase.object(pathOrRef + uid).update(data).then(() => {
        observer.next(true);
        observer.complete();
      }).catch((error: any) => {
        observer.error(error);
      });
    });
  }

  delete(pathOrRef: string, uid: string): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) => {
      this.afDatabase.object(pathOrRef + uid).remove().then(() => {
        observer.next(true);
        observer.complete();
      }).catch((error: any) => {
        observer.error(error);
      });
    });
  }

}

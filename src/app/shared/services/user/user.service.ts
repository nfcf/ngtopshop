import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { User } from 'app/shared/models';
import { DbService } from './../../../shared/services';

import * as firebase from 'firebase/app';


@Injectable()
export class UserService {

  constructor(private dbService: DbService) {}


  list(): Observable<User[]> {
    return this.dbService.list(DbService.DB_USERS_REF);
  }

  update(data: User): Observable<boolean> {
    const uid = data.$key
    data = JSON.parse(JSON.stringify(data));
    delete data.$key;
    return this.dbService.update(DbService.DB_USERS_REF, uid, data);
  }

  delete(data: User): Observable<boolean> {
    data.active = false;
    return this.update(data);
  }

}

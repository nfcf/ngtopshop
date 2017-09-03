import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';
import * as UserActions from 'app/store/actions/user.actions';
import { UserService } from 'app/shared/services';
import { User } from 'app/shared/models';

import 'rxjs/add/operator/switchMap';

@Injectable()
export class UserEffects {
  @Effect()
  list$ = this.actions$.ofType(UserActions.LIST_REQUEST)
    .switchMap(() => {
      return this.userService.list();
    })
    .switchMap((result) => {
      return Observable.of(new UserActions.ListResult(result));
    });

  @Effect({ dispatch: false })
  update$ = this.actions$.ofType(UserActions.UPDATE)
    .map((action: UserActions.Update) => action.payload)
    .switchMap((data: User) => {
      return this.userService.update(data);
    });

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) { }
}

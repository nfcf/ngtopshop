import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';
import * as OrderActions from 'app/state/actions/order.actions';
import { OrderService } from './../../orders/services';
import { Order } from 'app/shared/models';

import 'rxjs/add/operator/switchMap';

@Injectable()
export class OrderEffects {
  @Effect()
  list$ = this.actions$.ofType(OrderActions.LIST_REQUEST)
    .switchMap(() => {
      return this.orderService.list()
      .catch((error: any) => {
        return Observable.of([]);
      });
    })
    .switchMap((result) => {
      return Observable.of(new OrderActions.ListResult(result));
    });

  @Effect({ dispatch: false })
  new$ = this.actions$.ofType(OrderActions.NEW)
    .map((action: OrderActions.New) => action.payload)
    .switchMap((data: Order) => {
      return this.orderService.set(data);
    });

  @Effect({ dispatch: false })
  update$ = this.actions$.ofType(OrderActions.UPDATE)
    .map((action: OrderActions.Update) => action.payload)
    .switchMap((data: Order) => {
      return this.orderService.update(data);
    });

  @Effect({ dispatch: false })
  delete$ = this.actions$.ofType(OrderActions.DELETE)
    .map((action: OrderActions.Delete) => action.payload)
    .switchMap((data: Order) => {
      return this.orderService.delete(data);
    });

  constructor(
    private actions$: Actions,
    private orderService: OrderService
  ) { }
}

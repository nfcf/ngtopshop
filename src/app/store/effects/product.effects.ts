import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';
import * as ProductActions from 'app/store/actions/product.actions';
import { ProductsService } from './../../products/services';
import { Product } from 'app/shared/models';

import 'rxjs/add/operator/switchMap';

@Injectable()
export class ProductEffects {
  @Effect()
  list$ = this.actions$.ofType(ProductActions.LIST_REQUEST)
    .switchMap(() => {
      return this.productService.list();
    })
    .switchMap((result) => {
      return Observable.of(new ProductActions.ListResult(result));
    });

  @Effect({ dispatch: false })
  new$ = this.actions$.ofType(ProductActions.NEW)
    .map((action: ProductActions.New) => action.payload)
    .switchMap((data: Product) => {
      return this.productService.set(data);
    });

  @Effect({ dispatch: false })
  update$ = this.actions$.ofType(ProductActions.UPDATE)
    .map((action: ProductActions.Update) => action.payload)
    .switchMap((data: Product) => {
      return this.productService.update(data);
    });

  @Effect({ dispatch: false })
  delete$ = this.actions$.ofType(ProductActions.DELETE)
    .map((action: ProductActions.Delete) => action.payload)
    .switchMap((data: Product) => {
      return this.productService.delete(data);
    });

  constructor(
    private actions$: Actions,
    private productService: ProductsService
  ) { }
}

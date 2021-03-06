import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';
import * as ProductActions from 'app/state/actions/product.actions';
import { ProductService, AuthService } from 'app/shared/services';
import { Product } from 'app/shared/models';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProductEffects {
  @Effect()
  list$ = this.actions$.ofType(ProductActions.LIST_REQUEST)
    .switchMap(() => {
      return this.productService.list()
      .catch((error: any) => {
        return Observable.of([]);
      });
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
    private authService: AuthService,
    private productService: ProductService
  ) { }
}

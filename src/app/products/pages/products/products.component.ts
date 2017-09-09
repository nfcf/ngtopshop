import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { ConfirmationService } from '@jaspero/ng2-confirmations';
import { Product, User } from 'app/shared/models';
import { DialogModule } from 'primeng/primeng';
import { AuthService } from 'app/shared/services';
import * as ProductActions from 'app/state/actions/product.actions';
import * as fromRoot from 'app/state/reducers';
import { BaseComponent } from 'app/shared/components';
import 'rxjs/add/operator/first';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  currentUser: User;
  products: Product[];

  modal: any = {
    visible: false,
    product: undefined
  }

  constructor(
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private store: Store<fromRoot.State>) {
      super();
  }

  ngOnInit() {
    this.subscriptions.push(
      this.authService.getCurrentUser()
      .subscribe((user) => {
        this.currentUser = user;
      })
    );

    this.store.dispatch(new ProductActions.ListRequest());

    this.subscriptions.push(
      this.store.select('products')
      .subscribe((items: Product[]) => {
        this.products = items;
      })
    );
  }

  newProduct() {
    this.modal.product = new Product();
    this.modal.visible = true;
  }

  editProduct(product: Product) {
    this.modal.product = product;
    this.modal.visible = true;
  }

  deleteProduct(product: Product) {
    this.confirmationService.create('CONFIRM', 'Are you sure you want to delete this item?')
    .subscribe((result: any) => {
      if (result.resolved) {
        this.store.dispatch(new ProductActions.Delete(product));
      }
    });
  }

  save(product: Product) {
    if (product.$key) {
      this.store.dispatch(new ProductActions.Update(product));
    } else {
      this.store.dispatch(new ProductActions.New(product));
    }
    this.modal.visible = false;
  }

}

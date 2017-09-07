import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { Product, User, OrderItem } from 'app/shared/models';
import { DialogModule } from 'primeng/primeng';
import { AuthService } from 'app/shared/services';
import * as UserActions from 'app/state/actions/user.actions';
import * as ProductActions from 'app/state/actions/product.actions';
import * as fromRoot from 'app/state/reducers';
import 'rxjs/add/operator/first';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {

  currentUser: User;
  products: Product[];
  cart: OrderItem[];

  formGroup: FormGroup;

  modal: any = {
    visible: false
  }

  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>,
    private formBuilder: FormBuilder) {
      this.formGroup = formBuilder.group({
        $key: [ null ],
        billingAddress: [ null, Validators.required ],
        shippingAddress: [ null, Validators.required ],
      });
  }

  ngOnInit() {
    this.subscriptions.push(
      this.authService.getCurrentUser().subscribe((user) => {
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

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
    this.subscriptions.length = 0;
  }

  cancel() {
    this.modal.visible = false;
  }

  editProfile() {
    this.formGroup.controls.$key.setValue(this.currentUser.id);
    this.formGroup.controls.billingAddress.setValue(this.currentUser.billingAddress);
    this.formGroup.controls.shippingAddress.setValue(this.currentUser.shippingAddress);
    this.modal.visible = true;
  }

  saveProfile() {
    const user = <User>{
      $key: this.formGroup.controls.$key.value,
      billingAddress: this.formGroup.controls.billingAddress.value,
      shippingAddress: this.formGroup.controls.shippingAddress.value
    }
    this.store.dispatch(new UserActions.Update(user));

    this.modal.visible = false;
  }

  addToCart(product: Product) {
    this.store.dispatch(new ProductActions.Delete(product));
  }

  removeFromCart(product: Product) {
    this.store.dispatch(new ProductActions.Delete(product));
  }
}

import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { Product, User, OrderItem, Order } from 'app/shared/models';
import { DialogModule } from 'primeng/primeng';
import { AuthService } from 'app/shared/services';
import * as UserActions from 'app/state/actions/user.actions';
import * as OrderActions from 'app/state/actions/order.actions';
import * as ProductActions from 'app/state/actions/product.actions';
import * as CartActions from 'app/state/actions/cart.actions';
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

    this.subscriptions.push(
      this.store.select('cart')
      .subscribe((items: OrderItem[]) => {
        this.cart = items;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
    this.subscriptions.length = 0;
  }

  getCartQuantity(product: Product) {
    const orderItem = this.cart.find((item: OrderItem) => {
      return item.productId === product.id;
    });
    return orderItem ? orderItem.quantity : 0;
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
    this.store.dispatch(new CartActions.Add(product));
  }

  removeFromCart(product: Product) {
    this.store.dispatch(new CartActions.Remove(product));
  }

  checkout() {
    const order = new Order(this.currentUser.id);
    order.items = this.cart;

    const self = this;
    const handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_es8mju5aGwxTaVp1qJhBD6cE',
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      email: 'nfcf@ist.utl.pt', // this.currentUser.email,
      billingAddress: !this.currentUser.billingAddress,
      token: (token: any, args: any) => {
        this.stripeCallback(self, order, token, args);
      }
    });

    handler.open({
      name: 'NgTopShop',
      description: 'Buying Stuff',
      amount: order.totalPrice * 100,
      currency: 'EUR',
      panelLabel: 'Buy now!',
    });
  }

  private stripeCallback(self: any, order: Order, token: any, args: any) {
    /*if (args && args.billing_address_line1) {
      self.userProfile.address = args.billing_address_line1;
      self.userProfile.postCode = args.billing_address_zip;
      self.userProfile.city = args.billing_address_city;
      self.userProfile.countryCode = args.billing_address_country_code;
    }*/

    this.store.dispatch(new OrderActions.New(order));

    this.store.dispatch(new CartActions.Clear());
  }
}

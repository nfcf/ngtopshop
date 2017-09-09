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
import { BaseComponent } from 'app/shared/components';
import { environment } from 'environments/environment';
import 'rxjs/add/operator/first';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent extends BaseComponent implements OnInit {

  currentUser: User;
  products: Product[];
  cart: OrderItem[];

  modal: any = {
    visible: false,
    user: undefined
  }

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>,
    private formBuilder: FormBuilder) {
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

    this.subscriptions.push(
      this.store.select('cart')
      .subscribe((items: OrderItem[]) => {
        this.cart = items;
      })
    );
  }

  getCartQuantity(product: Product) {
    const orderItem = this.cart.find((item: OrderItem) => {
      return item.productId === product.id;
    });
    return orderItem ? orderItem.quantity : 0;
  }

  editProfile() {
    this.modal.user = this.currentUser;
    this.modal.visible = true;
  }

  save(user: User) {
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
      key: environment.stripe.apiKey,
      image: environment.stripe.checkoutImage,
      locale: 'auto',
      email: this.currentUser.email,
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

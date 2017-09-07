import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { Order, User, OrderItem, Product } from 'app/shared/models';
import { DialogModule, SelectItem } from 'primeng/primeng';
import { AuthService } from 'app/shared/services';
import * as OrderActions from 'app/state/actions/order.actions';
import * as ProductActions from 'app/state/actions/product.actions';
import * as fromRoot from 'app/state/reducers';
import 'rxjs/add/operator/first';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {

  statuses: SelectItem[] = [
    { label: 'New', value: 'new' },
    { label: 'Dispatched', value: 'dispatched' }
  ];

  currentUser: User;
  orders: Order[];
  products: Product[];

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
        status: [ null, Validators.required ],
      });
  }

  ngOnInit() {
    this.authService.getCurrentUser().first().subscribe((user) => {
      this.currentUser = user;
    });

    this.store.dispatch(new OrderActions.ListRequest());
    this.store.dispatch(new ProductActions.ListRequest());

    this.subscriptions.push(
      this.store.select('orders')
      .subscribe((items: Order[]) => {
        this.orders = items.filter((item) => {
          return item.userId === this.currentUser.id;
        });
      })
    );

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

  editOrder(item: Order) {
    this.formGroup.controls.$key.setValue(item.$key);
    this.formGroup.controls.status.setValue(item.status);
    this.modal.visible = true;
  }

  deleteOrder(item: Order) {
    this.store.dispatch(new OrderActions.Delete(item));
  }

  save() {
    const item = <Order>{
      $key: this.formGroup.controls.$key.value,
      status: this.formGroup.controls.status.value,
    }
    this.store.dispatch(new OrderActions.Update(item));

    this.modal.visible = false;
  }

  cancel() {
    this.modal.visible = false;
  }

  private generateOrderItems(): OrderItem[] {
    const iterations = Math.round(Math.random() * 3);
    const result = [];
    for (let i = 0; i <= iterations; i++) {
      const product = this.products[Math.round(Math.random() * (this.products.length - 1))];
      result.push(<OrderItem>{
        productId: product.$key,
        quantity: Math.round(Math.random() * 3),
        price: product.price
      });
    }
    return result;
  }

}

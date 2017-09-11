import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { ConfirmationService } from '@jaspero/ng2-confirmations';
import { Order, User, OrderItem, Product } from 'app/shared/models';
import { DialogModule, SelectItem } from 'primeng/primeng';
import { AuthService } from 'app/shared/services';
import * as OrderActions from 'app/state/actions/order.actions';
import * as ProductActions from 'app/state/actions/product.actions';
import * as fromRoot from 'app/state/reducers';
import { BaseComponent } from 'app/shared/components';
import { plainToClass } from 'class-transformer';
import 'rxjs/add/operator/first';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent extends BaseComponent implements OnInit {

  statuses: SelectItem[] = [
    { label: 'New', value: 'new' },
    { label: 'Dispatched', value: 'dispatched' },
    { label: 'Delivered', value: 'delivered' }
  ];

  currentUser: User;
  orders: Order[];
  products: Product[];

  modal: any = {
    visible: false,
    order: undefined
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

    this.subscriptions.push(
      this.store.select('orders')
      .subscribe((items: Order[]) => {
        this.orders = items.filter((item) => {
          return item.userEmail === this.currentUser.email;
        }).map((item: Order) => {
          return plainToClass(Order, item);
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

  editOrder(order: Order) {
    this.modal.order = order;
    this.modal.visible = true;
  }

  deleteOrder(order: Order) {
    this.confirmationService.create('CONFIRM', 'Are you sure you want to delete this item?')
    .subscribe((result: any) => {
      if (result.resolved) {
        this.store.dispatch(new OrderActions.Delete(order));
      }
    });
  }

  save(item: Order) {
    this.store.dispatch(new OrderActions.Update(item));
    this.modal.visible = false;
  }

}

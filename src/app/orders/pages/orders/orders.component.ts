import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { Order, User, OrderItem, Product } from 'app/shared/models';
import { DialogModule, SelectItem } from 'primeng/primeng';
import * as OrderActions from 'app/store/actions/order.actions';
import * as ProductActions from 'app/store/actions/product.actions';
import * as fromRoot from 'app/store/reducers';
import { AuthService } from 'app/shared/services';


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
    this.store.dispatch(new OrderActions.ListRequest());
    this.store.dispatch(new ProductActions.ListRequest());

    this.subscriptions.push(
      this.store.select('orders')
      .subscribe((items: Order[]) => {
        this.orders = items;
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

  newOrder() {
    this.authService.getCurrentUser().subscribe(
      (user: User) => {
        const order = <Order>{
          userId: user.id,
          active: true,
          createdAtUtc: new Date().toISOString(),
          status: 'new',
          items: this.generateOrderItems()
        };
        order.totalPrice = 0;
        order.items.forEach((item: OrderItem) => {
          order.totalPrice += item.quantity * item.price;
        });
        this.store.dispatch(new OrderActions.New(order));
      }
    );
  }

  editOrder(item: Order) {
    // this.modal.type = 'edit';
    // this.formGroup.controls.$key.setValue(item.$key);
    // this.formGroup.controls.name.setValue(item.name);
    // this.formGroup.controls.description.setValue(item.description);
    // this.formGroup.controls.price.setValue(item.price);
    // this.modal.visible = true;
  }

  deleteOrder(item: Order) {
    this.store.dispatch(new OrderActions.Delete(item));
  }

  save() {
    const item = <Order>{
      $key: this.formGroup.controls.$key.value,
      // name: this.formGroup.controls.name.value,
      // description: this.formGroup.controls.description.value,
      // price: this.formGroup.controls.price.value
    }
    /*if (this.modal.type === 'new') {
      this.store.dispatch(new OrderActions.New(item));
    } else {
      this.store.dispatch(new OrderActions.Update(item));
    }

    this.modal.visible = false;*/
  }

  cancel() {
    // this.modal.visible = false;
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

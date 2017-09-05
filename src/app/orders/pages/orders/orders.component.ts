import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { Order, User, OrderItem } from 'app/shared/models';
import { DialogModule } from 'primeng/primeng';
import * as OrderActions from 'app/store/actions/order.actions';
import * as fromRoot from 'app/store/reducers';
import { AuthService } from 'app/shared/services';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Order[];

  formGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>,
    private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.store.dispatch(new OrderActions.ListRequest());
    this.store.select('orders')
    .subscribe((items: Order[]) => {
      this.orders = items;
    });
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

  deleteProduct(item: Order) {
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
    return [];
  }

}

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { Order } from 'app/shared/models';
import { DialogModule } from 'primeng/primeng';
import * as ProductActions from 'app/store/actions/product.actions';
import * as fromRoot from 'app/store/reducers';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Order[];

  formGroup: FormGroup;

  modal: any = {
    visible: false,
    type: 'new'
  }

  constructor(
    private store: Store<fromRoot.State>,
    private formBuilder: FormBuilder) {
      this.formGroup = formBuilder.group({
        $key: [ null ],
        name: [ null, Validators.required ],
        description: [ null, Validators.required ],
        price: [ null, Validators.required ],
      });
  }

  ngOnInit() {
    this.store.dispatch(new ProductActions.ListRequest());
    /*this.store.select('orders')
    .subscribe((items: Order[]) => {
      this.orders = items;
    });*/
  }
/*
  newProduct() {
    this.modal.type = 'new';
    this.formGroup.controls.$key.setValue(undefined);
    this.formGroup.controls.name.setValue(undefined);
    this.formGroup.controls.description.setValue(undefined);
    this.formGroup.controls.price.setValue(undefined);
    this.modal.visible = true;
  }

  editProduct(product: Product) {
    this.modal.type = 'edit';
    this.formGroup.controls.$key.setValue(product.$key);
    this.formGroup.controls.name.setValue(product.name);
    this.formGroup.controls.description.setValue(product.description);
    this.formGroup.controls.price.setValue(product.price);
    this.modal.visible = true;
  }

  deleteProduct(product: Product) {
    this.store.dispatch(new ProductActions.Delete(product));
  }

  save() {
    const product = <Product>{
      $key: this.formGroup.controls.$key.value,
      name: this.formGroup.controls.name.value,
      description: this.formGroup.controls.description.value,
      price: this.formGroup.controls.price.value
    }
    if (this.modal.type === 'new') {
      this.store.dispatch(new ProductActions.New(product));
    } else {
      this.store.dispatch(new ProductActions.Update(product));
    }

    this.modal.visible = false;
  }

  cancel() {
    this.modal.visible = false;
  }*/

}

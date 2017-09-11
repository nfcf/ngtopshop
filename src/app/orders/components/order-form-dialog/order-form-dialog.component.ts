import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BaseComponent } from 'app/shared/components';
import { Order } from 'app/shared/models';


@Component({
  selector: 'order-form-dialog',
  templateUrl: './order-form-dialog.component.html'
})
export class OrderFormDialogComponent extends BaseComponent {
  @Input() visible: boolean;
  @Input() set order(value: Order) {
    this._order = value;
    this.bindInputToForm();
  }
  @Output() visibleChange: EventEmitter<boolean>;
  @Output() submit: EventEmitter<Order>;

  readonly statuses: SelectItem[] = [
    { label: 'New', value: 'new' },
    { label: 'Dispatched', value: 'dispatched' },
    { label: 'Delivered', value: 'delivered' }
  ];

  formGroup: FormGroup;
  private _order: Order;

  constructor(private formBuilder: FormBuilder) {
      super();

      this.visibleChange = new EventEmitter<boolean>();
      this.submit = new EventEmitter<Order>();

      this.formGroup = formBuilder.group({
        $key: [ null ],
        status: [ null, Validators.required ],
      });
  }

  save() {
    const order = <Order>{
      $key: this.formGroup.controls.$key.value,
      status: this.formGroup.controls.status.value,
    }
    this.submit.emit(order);

    this.close();
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  private bindInputToForm() {
    if (this._order) {
      this.formGroup.controls.$key.setValue(this._order.$key || this._order.id);
      this.formGroup.controls.status.setValue(this._order.status);
    }
  }
}

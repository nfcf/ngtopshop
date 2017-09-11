import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BaseComponent } from 'app/shared/components';
import { Product } from 'app/shared/models';


@Component({
  selector: 'product-form-dialog',
  templateUrl: './product-form-dialog.component.html'
})
export class ProductFormDialogComponent extends BaseComponent {
  @Input() visible: boolean;
  @Input() set product(value: Product) {
    this._product = value;
    this.bindInputToForm();
  }
  @Output() visibleChange: EventEmitter<boolean>;
  @Output() submit: EventEmitter<Product>;

  formGroup: FormGroup;
  private _product: Product;

  constructor(private formBuilder: FormBuilder) {
      super();

      this.visibleChange = new EventEmitter<boolean>();
      this.submit = new EventEmitter<Product>();

      this.formGroup = formBuilder.group({
        $key: [ null ],
        name: [ null, Validators.required ],
        description: [ null, Validators.required ],
        price: [ null, Validators.required ],
      });
  }

  save() {
    const product = <Product>{
      $key: this.formGroup.controls.$key.value,
      name: this.formGroup.controls.name.value,
      description: this.formGroup.controls.description.value,
      price: this.formGroup.controls.price.value,
      active: true,
    }
    this.submit.emit(product);

    this.close();
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  private bindInputToForm() {
    if (this._product) {
      this.formGroup.controls.$key.setValue(this._product.$key || this._product.id);
      this.formGroup.controls.name.setValue(this._product.name);
      this.formGroup.controls.description.setValue(this._product.description);
      this.formGroup.controls.price.setValue(this._product.price);
    }
  }
}

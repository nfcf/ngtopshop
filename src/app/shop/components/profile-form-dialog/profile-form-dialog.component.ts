import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BaseComponent } from 'app/shared/components';
import { User } from 'app/shared/models';


@Component({
  selector: 'profile-form-dialog',
  templateUrl: './profile-form-dialog.component.html'
})
export class ProfileFormDialogComponent extends BaseComponent {
  @Input() visible: boolean;
  @Input() set user(value: User) {
    this._user = value;
    this.bindInputToForm();
  }
  @Output() visibleChange: EventEmitter<boolean>;
  @Output() submit: EventEmitter<User>;

  formGroup: FormGroup;
  private _user: User;

  constructor(private formBuilder: FormBuilder) {
      super();

      this.visibleChange = new EventEmitter<boolean>();
      this.submit = new EventEmitter<User>();

      this.formGroup = formBuilder.group({
        $key: [ null ],
        displayName: [ null, Validators.required ],
        billingAddress: [ null, Validators.required ],
        shippingAddress: [ null, Validators.required ],
      });
  }

  save() {
    const user = <User>{
      $key: this.formGroup.controls.$key.value,
      displayName: this.formGroup.controls.displayName.value || '',
      billingAddress: this.formGroup.controls.billingAddress.value || '',
      shippingAddress: this.formGroup.controls.shippingAddress.value || ''
    }
    this.submit.emit(user);

    this.close();
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  private bindInputToForm() {
    if (this._user) {
      this.formGroup.controls.$key.setValue(this._user.$key || this._user.id);
      this.formGroup.controls.displayName.setValue(this._user.displayName);
      this.formGroup.controls.billingAddress.setValue(this._user.billingAddress);
      this.formGroup.controls.shippingAddress.setValue(this._user.shippingAddress);
    }
  }
}

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BaseComponent } from 'app/shared/components';
import { User } from 'app/shared/models/user';


@Component({
  selector: 'user-form-dialog',
  templateUrl: './user-form-dialog.component.html'
})
export class UserFormDialogComponent extends BaseComponent {
  @Input() visible: boolean;
  @Input() set user(value: User) {
    this._user = value;
    this.bindInputToForm();
  }
  @Output() visibleChange: EventEmitter<boolean>;
  @Output() submit: EventEmitter<User>;

  readonly roles: SelectItem[] = [
    { label: 'User', value: 'user' },
    { label: 'Manager', value: 'manager' },
    { label: 'Administrator', value: 'admin' }
  ];

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
        role: [ 'user', Validators.required ],
      });
  }

  save() {
    const user = <User>{
      $key: this.formGroup.controls.$key.value,
      displayName: this.formGroup.controls.displayName.value || '',
      billingAddress: this.formGroup.controls.billingAddress.value || '',
      shippingAddress: this.formGroup.controls.shippingAddress.value || '',
      role: this.formGroup.controls.role.value || 'user'
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
      this.formGroup.controls.$key.setValue(this._user.$key);
      this.formGroup.controls.displayName.setValue(this._user.displayName);
      this.formGroup.controls.billingAddress.setValue(this._user.billingAddress);
      this.formGroup.controls.shippingAddress.setValue(this._user.shippingAddress);
      this.formGroup.controls.role.setValue(this._user.role);
    }
  }
}

import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { User } from 'app/shared/models';
import { DialogModule, SelectItem } from 'primeng/primeng';
import * as UserActions from 'app/store/actions/user.actions';
import * as fromRoot from 'app/store/reducers';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  roles: SelectItem[] = [
    { label: 'User', value: 'user' },
    { label: 'Manager', value: 'manager' },
    { label: 'Administrator', value: 'admin' }
  ];

  users: User[];

  formGroup: FormGroup;

  modal: any = {
    visible: false
  }

  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store<fromRoot.State>,
    private formBuilder: FormBuilder) {
      this.formGroup = formBuilder.group({
        $key: [ null ],
        displayName: [ null, Validators.required ],
        billingAddress: [ null, Validators.required ],
        shippingAddress: [ null, Validators.required ],
        role: [ 'user', Validators.required ],
      });
  }

  ngOnInit() {
    this.store.dispatch(new UserActions.ListRequest());

    this.subscriptions.push(
      this.store.select('users')
      .subscribe((items: User[]) => {
        this.users = items;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
    this.subscriptions.length = 0;
  }

  editUser(user: User) {
    this.formGroup.controls.$key.setValue(user.$key);
    this.formGroup.controls.displayName.setValue(user.displayName);
    this.formGroup.controls.billingAddress.setValue(user.billingAddress);
    this.formGroup.controls.shippingAddress.setValue(user.shippingAddress);
    this.formGroup.controls.role.setValue(user.role);
    this.modal.visible = true;
  }

  toggleUserState(user: User) {
    user.active = !user.active;
    this.store.dispatch(new UserActions.Update(user));
  }

  save() {
    const user = <User>{
      $key: this.formGroup.controls.$key.value,
      displayName: this.formGroup.controls.displayName.value || '',
      billingAddress: this.formGroup.controls.billingAddress.value || '',
      shippingAddress: this.formGroup.controls.shippingAddress.value || '',
      role: this.formGroup.controls.role.value || 'user'
    }
    this.store.dispatch(new UserActions.Update(user));

    this.modal.visible = false;
  }

  cancel() {
    this.modal.visible = false;
  }

}

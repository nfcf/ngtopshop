import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { User } from 'app/shared/models';
import { DialogModule, SelectItem } from 'primeng/primeng';
import * as UserActions from 'app/state/actions/user.actions';
import * as fromRoot from 'app/state/reducers';
import { BaseComponent } from 'app/shared/components';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends BaseComponent implements OnInit {

  users: User[];

  modal: any = {
    visible: false,
    user: undefined
  }

  constructor(private store: Store<fromRoot.State>) {
      super();
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

  editUser(user: User) {
    this.modal.user = user;
    this.modal.visible = true;
  }

  toggleUserState(user: User) {
    user.active = !user.active;
    this.store.dispatch(new UserActions.Update(user));
  }

  save(user: User) {
    this.store.dispatch(new UserActions.Update(user));
    this.modal.visible = false;
  }

}

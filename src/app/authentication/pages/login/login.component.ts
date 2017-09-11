import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { State, Store } from '@ngrx/store';
import { AlertsService } from '@jaspero/ng2-alerts';
import { AuthService } from './../../../shared/services';
import * as RouterActions from 'app/state/actions/router.actions';
import * as fromRoot from 'app/state/reducers';
import { BaseComponent } from 'app/shared/components';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private store: Store<fromRoot.State>,
              private authService: AuthService,
              private alertService: AlertsService) {
    super();
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  login() {
    if (this.loginForm.valid) {
      const model = this.loginForm.value;
      this.authService.loginWithEmail(model.email, model.password).subscribe(
        (response: any) => {
          this.loginSuccessful();
        },
        (error: any) => {
          this.alertService.create('error', error.message);
        }
      );
    }
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().subscribe(
      (response: any) => {
        this.loginSuccessful();
      },
      (error: any) => {
        this.alertService.create('error', error.message);
      }
    );
  }

  register() {
    this.store.dispatch(new RouterActions.Go({ path: ['auth/register'] }));
  }

  resetPassword() {
    this.alertService.create('info', 'Not implemented...');
  }

  private loginSuccessful() {
    this.subscriptions.push(
      this.authService.getCurrentUser()
      .subscribe((profile) => {
        const newRoute = (!profile || !profile.role || profile.role === 'user')
                       ? 'shop'
                       : 'products';
        this.store.dispatch(new RouterActions.Go({ path: [newRoute] }));
      })
    );
  }

}

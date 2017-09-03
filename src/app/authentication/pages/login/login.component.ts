import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { State, Store } from '@ngrx/store';
import { AlertsService } from '@jaspero/ng2-alerts';
import { AuthService } from './../../../shared/services';
import * as RouterActions from 'app/store/actions/router.actions';
import * as fromRoot from 'app/store/reducers';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private store: Store<fromRoot.State>,
              private authService: AuthService,
              private alertService: AlertsService) {
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
          this.authService.getUserProfile().subscribe((profile) => {
            const newRoute = profile.role === 'admin' || profile.role === 'manager' ? 'products' : 'home';
            this.store.dispatch(new RouterActions.Go({ path: [newRoute] }));
          });
        },
        (error: any) => {
          this.alertService.create('error', error.message);
        }
      );
    }
  }

  register() {
    this.store.dispatch(new RouterActions.Go({ path: ['auth/register'] }));
  }

  resetPassword() {
    alert('not implemented yet');
  }

}

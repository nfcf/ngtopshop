import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReCaptchaComponent } from 'angular2-recaptcha';
import { State, Store } from '@ngrx/store';
import { AlertsService } from '@jaspero/ng2-alerts';
import { AuthService } from './../../../shared/services';
import * as RouterActions from 'app/state/actions/router.actions';
import * as fromRoot from 'app/state/reducers';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild(ReCaptchaComponent) recaptcha: ReCaptchaComponent;

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private store: Store<fromRoot.State>,
              private authService: AuthService,
              private alertService: AlertsService) {
    this.registerForm = formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  register() {
    const token = this.recaptcha.getResponse();
    if (this.registerForm.valid && token) {
      const model = this.registerForm.value;
      this.authService.registerWithEmail(model.name, model.email, model.password).subscribe(
        (response: any) => {
          this.authService.logout(); // this clears any inmemory user and goes to the login page
          setTimeout(() => {
            this.alertService.create('success', 'A verification email has been sent to your account!');
          }, 500);
        },
        (error: any) => {
          this.alertService.create('error', error.message);
        }
      );
    }
  }

  login() {
    this.store.dispatch(new RouterActions.Go({ path: ['auth/login'] }));
  }

}

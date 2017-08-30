import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AlertsService } from '@jaspero/ng2-alerts';
import { AuthService } from './../../../shared/services';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
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
          const role = this.authService.userProfile.role;
          const newRoute = role === 'admin' || role === 'manager' ? 'products' : 'home';
          this.router.navigate([newRoute]);
        },
        (error: any) => {
          this.alertService.create('error', error.message);
        }
      );
    }
  }

  register() {
    this.router.navigate(['auth/register']);
  }

  resetPassword() {
    alert('not implemented yet');
  }

}

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertsService } from '@jaspero/ng2-alerts';
import { AuthService } from './../../../shared/services';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
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
    if (this.registerForm.valid) {
      const model = this.registerForm.value;
      this.authService.registerWithEmail(model.name, model.email, model.password).subscribe(
        (response: any) => {
          this.router.navigate(['auth/login']);
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
    this.router.navigate(['auth/login']);
  }

}

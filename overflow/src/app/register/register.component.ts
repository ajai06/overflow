import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router} from '@angular/router';

import { PasswordValidator } from '../shared/password.Validators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router ) { }

  registerForm = this.formBuilder.group({
    name : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(2)]],
    password_confirmation: ['', [Validators.required]]

  }, {validators: PasswordValidator});

  emailerror;
  submitted = false;

  ngOnInit() {
  }

  get check() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
    this.authService.registerUser(this.registerForm.value).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/forum']);
        console.log(res);
    },
    err => {
      this.emailerror = err.error.errors.email;
      console.log(err.error.errors);
    }
    );
   }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  loginError;
  submitted = false;

  ngOnInit() {
  }

  get check() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    } else {
    this.authService.loginUser(this.loginForm.value).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.user.id);
        this.router.navigateByUrl('');
      },
      err => {
        this.loginError = err.error.error;
        console.log(err.error.error);
      }
    );
  }

  }


}

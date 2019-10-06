import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  registerUrl = 'http://forum.mashuptest.com/api/register';

  loginUrl = 'http://forum.mashuptest.com/api/login';

  constructor(private http: HttpClient,
              private router: Router) { }

  registerUser(userData) {
        return this.http.post<any>(this.registerUrl, userData);
  }

  loginUser(loginData): Observable<any> {
    console.log(loginData);
    return this.http.post<any>(this.loginUrl, loginData);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/forum']);
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

}

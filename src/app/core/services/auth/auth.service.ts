import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {USER} from '../../../models/auth/user.model';
import {Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // readonly endpoint = 'http://10.13.45.122:8080/demoLogin/api/';
  readonly endpoint = 'http://localhost:8080/demoLogin/api/';
  zuSenden = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  //Works
  validateLogin(user: USER): Observable<any>{
    console.log('Auth Service validate Login()');
    this.zuSenden = ('{"username": "' + user.name + '", "password": "' + user.password + '"}');
    console.log(this.zuSenden);
    return this.http.post(this.endpoint + 'users/validate', this.zuSenden);
  }

  //Works
  registerUser(user: USER): Observable<any>{
    console.log('Auth Service Register user()');
    this.zuSenden = ('{"username": "' + user.name + '", "password": "' + user.password + '"}');
    console.log(this.zuSenden);
    return this.http.post(this.endpoint + 'users/register', this.zuSenden);
  }

  //Works
  deleteUser(): Observable<any>{
    console.log('Auth Service Delete User()');
    this.zuSenden = ('{"accessToken": "' + this.cookieService.get('AccessToken') + '"}');
    console.log(this.zuSenden);
    return this.http.post(this.endpoint + 'users/delete', this.zuSenden);
  }

  //Works but Backend Error
  alterPassword(password: string): Observable<any>{
    console.log('alter Password');
    this.zuSenden = ('{"accessToken": "' + this.cookieService.get('AccessToken') + '", "password": "' + password + '"}');
    console.log(this.zuSenden);
    return this.http.post(this.endpoint + 'users/alter', this.zuSenden);
  }
}

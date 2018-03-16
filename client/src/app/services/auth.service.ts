import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class AuthService {

  url = 'http://localhost:3000/';
  token;
  httpOptions;

  constructor(private http: HttpClient) {

  }

  getHeaders() {
    this.token = localStorage.getItem('token');

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.token || ''
      })
    };
  }

  registration(values) {
    return this.http.post(this.url + 'auth/registration', values);
  }

  login(values) {
    return this.http.post(this.url + 'auth/login', values)
      .map((data: any) => {
        if (data.success) {
          this.token = data.token;
          localStorage.setItem('user', data.user);
          localStorage.setItem('token', data.token);
          return data;
        }else{
          return data;
        }
      });
  }

  checkField(value, type) {
    if (!value) return Observable.empty<Response>();
    return this.http.get(this.url + `auth/checkField/${value}&${type}`);
  }

  getProfile() {
    this.getHeaders();
    if (!this.token) return Observable.empty();
    return this.http.get(this.url + `auth/profile`, this.httpOptions);
  }

  isLoggedIn() {
    this.getHeaders();
    if (this.token) return true;
  }

  logout() {
    localStorage.clear();
    this.getHeaders();
  }

}

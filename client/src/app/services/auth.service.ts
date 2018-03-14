import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class AuthService {

  url = 'http://localhost:3000/';

  constructor(private http: HttpClient) {
  }

  registration(values) {
    return this.http.post(this.url + 'auth/registration', values);
  }

  checkField(value, type) {
    if(!value) return Observable.empty<Response>();
    return this.http.get(this.url + `auth/checkField/${value}&${type}`);
  }

  test() {
    return this.http.get(this.url + 'auth/test');
  }

}

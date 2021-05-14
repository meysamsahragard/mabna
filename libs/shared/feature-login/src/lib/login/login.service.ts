import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) {
  }

  authenticate(username: string, password: string) {
    return this.http.post('api/authenticate',
      {
        username: username,
        password: password
      }
    );
  }
}

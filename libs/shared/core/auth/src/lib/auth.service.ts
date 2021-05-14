import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '@mabna/shared/model';
import { MabnaStorage } from '@mabna/shared/core/services';

@Injectable()
export class AuthService {
  private BASE_URL = 'http://localhost:1337';

  constructor(private router: Router, private http: HttpClient) {}

  public get userValue() {
    return JSON.parse(MabnaStorage.getItem('user'));
  }


  logout() {
    MabnaStorage.removeItem('user');
  }

  logIn(username: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}/authenticate`;
    return this.http.post<User>(url, { username, password });
  }
}

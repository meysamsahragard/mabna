import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthState, LogIn } from '@mabna/shared/store';
import { User } from '@mabna/shared/model';

@Component({
  selector: 'mabna-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private store: Store<AuthState>) {
  }

  onSubmit(user: User): void {
    const payload = {
      username: user.username,
      password: user.password
    };
    this.store.dispatch(new LogIn(payload));
  }
}

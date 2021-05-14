import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthService } from '@mabna/shared/core/auth';
import {
  AuthActionTypes,
  LogIn,
  LogInFailure,
  LogInSuccess
} from './auth.actions';
import { MabnaStorage, NotificationService } from '@mabna/shared/core/services';

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
  }

  LogIn = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActionTypes.LOGIN),
      map((action: LogIn) => action.payload),
      switchMap((payload) => {
        return this.authService.logIn(payload.username, payload.password).pipe(
          map((user) => {
            return new LogInSuccess(user);
          }),
          catchError((error) => {
            this.notificationService.showError(error.error.message);
            return of(new LogInFailure({ error: error }));
          })
        );
      })
    )
  );

  LogInSuccess = createEffect(
    () =>
      this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS),
        tap((payload: any) => {
          MabnaStorage.setItem('user', JSON.stringify(payload.payload));
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  LogInFailure = createEffect(
    () => this.actions.pipe(ofType(AuthActionTypes.LOGIN_FAILURE)),
    { dispatch: false }
  );

  LogOut = createEffect(
    () =>
      this.actions.pipe(
        ofType(AuthActionTypes.LOGOUT),
        tap((user) => {
          MabnaStorage.removeItem('user');
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );
}

import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, startWith } from 'rxjs/operators';
import { MabnaStorage, NotificationService } from '@mabna/shared/core/services';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((response) => {
        if (response.status.toString().startsWith('5'))
          this.notificationService.showError('An error occurred on the server. Please try again.');
        switch (response.status) {
          case 401:
            this.notificationService.showError('You do not have the required permission');
            MabnaStorage.removeItem('user');
            this.router.navigateByUrl('/login');
            break;
          case 400:
            this.notificationService.showError(response.error.message);
            break;
        }

        return throwError(response);
      })
    );
  }
}

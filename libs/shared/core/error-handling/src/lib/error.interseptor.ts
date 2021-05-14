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
import { catchError } from 'rxjs/operators';
import { MabnaStorage } from '@mabna/shared/core/services';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router
  ) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((response) => {
        if (response instanceof HttpErrorResponse && response.status === 401) {
          MabnaStorage.removeItem('user');
          this.router.navigateByUrl('/log-in');
        }
        return throwError(response);
      })
    );
  }
}

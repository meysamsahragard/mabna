import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

import { AuthService } from './auth.service';
import { MabnaStorage, NotificationService } from '@mabna/shared/core/services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user = this.authService.userValue;
    if (user && user.type === next.data.role) {
      return true;
    } else if (user && user.type !== next.data.role) {
      this.notificationService.showError('You do not have the required permission');
    }
    MabnaStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}

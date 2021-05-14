import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';

import {
  getLoading,
  LoadingDisable,
  LoadingEnable,
  LoadingState,
} from '@mabna/shared/store';

@Component({
  selector: 'mabna-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loading: Observable<boolean>;

  constructor(private router: Router, private store: Store<LoadingState>) {
    this.loading = this.store.select(getLoading);
    router.events.subscribe((routerEvent: any) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.store.dispatch(new LoadingEnable());
    }

    if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      this.store.dispatch(new LoadingDisable());
    }
  }
}

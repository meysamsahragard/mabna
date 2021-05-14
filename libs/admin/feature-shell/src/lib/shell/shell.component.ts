import { Component } from '@angular/core';
import { Data, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import { SidenavItem } from '@mabna/shared/ui/sidenav-list';
import { routerTransition } from '@mabna/shared/util';
import { AuthState, LogOut } from '@mabna/shared/store';

@Component({
  templateUrl: 'shell.component.html',
  styleUrls: ['shell.component.scss'],
  animations: [
    routerTransition
  ]
})

export class ShellComponent {
  sideNavList: SidenavItem[] = [
    {
      title: 'Logout',
      icon: 'logout'
    }
  ];

  constructor(private store: Store<AuthState>) {
  }

  prepareRoute(outlet: RouterOutlet): Data {
    return outlet && outlet.activatedRouteData;
  }

  sideNavListItemClick(item: SidenavItem) {
    if (item.title === 'Logout') {
      this.store.dispatch(new LogOut);
    }
  }
}

import { Component, Output, EventEmitter } from '@angular/core';

import { AuthState, LogOut } from '@mabna/shared/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'mabna-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent {
  @Output() public sidenavToggle = new EventEmitter();

  constructor(private store: Store<AuthState>) {}

  logout() {
    this.store.dispatch(new LogOut());
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };
}

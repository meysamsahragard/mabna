import { Component, Output, EventEmitter, Input } from '@angular/core';
import { SidenavItem } from '../sidenav-item';



@Component({
  selector: 'mabna-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent {
  @Input() items: SidenavItem[];
  @Output() itemClick = new EventEmitter();

  public onItemClick(item: SidenavItem): void {
    this.itemClick.emit(item);
  }

}

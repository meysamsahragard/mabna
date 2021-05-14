import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { SharedMaterialModule } from '@mabna/shared/material';

@NgModule({
  imports: [CommonModule,
    SharedMaterialModule
  ],
  declarations: [SidenavListComponent],
  exports: [SidenavListComponent]
})
export class SharedUiSidenavListModule {
}

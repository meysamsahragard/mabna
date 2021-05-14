import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ShellComponent } from './shell/shell.component';
import { SharedMaterialModule } from '@mabna/shared/material';
import { SharedUiSidenavListModule } from '@mabna/shared/ui/sidenav-list';

const Routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@mabna/admin/feature-home').then(m => m.AdminFeatureHomeModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    SharedMaterialModule,
    RouterModule.forChild(Routes),
    FlexLayoutModule,
    SharedUiSidenavListModule
  ],
  declarations: [
    ShellComponent
  ]
})
export class AdminFeatureShellModule {
}

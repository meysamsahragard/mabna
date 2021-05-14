import { NgModule } from '@angular/core';
import { SharedMaterialModule } from '@mabna/shared/material';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './shell/header/header.component';
import { SharedUiSidenavListModule } from '@mabna/shared/ui/sidenav-list';
import { SharedUiFooterModule } from '@mabna/shared/ui/footer';

const Routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@mabna/task-management/feature-task-list').then(
            (m) => m.TaskManagementFeatureTaskListModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    SharedMaterialModule,
    RouterModule.forChild(Routes),
    FlexLayoutModule,
    SharedUiSidenavListModule,
    SharedUiFooterModule
  ],
  declarations: [ShellComponent, HeaderComponent],
})
export class TaskManagementFeatureShellModule {}

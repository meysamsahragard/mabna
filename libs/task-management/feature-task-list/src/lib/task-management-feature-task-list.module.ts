import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TaskListComponent } from './task-list/task-list.component';
import { SharedMaterialModule } from '@mabna/shared/material';
import { TaskManagementUiTaskDialogModule } from '@mabna/task-management/ui/task-dialog';
import { TaskService } from '@mabna/task-management/store';

const Routes: Routes = [
  {
    path: '',
    component: TaskListComponent,
  },
];

@NgModule({
  imports: [
    SharedMaterialModule,
    RouterModule.forChild(Routes),
    CommonModule,
    TaskManagementUiTaskDialogModule,
  ],
  declarations: [TaskListComponent],
  providers: [TaskService],
})
export class TaskManagementFeatureTaskListModule {}

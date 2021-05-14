import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { TaskDialogComponent } from './task/task-dialog.component';
import { SharedMaterialModule } from '@mabna/shared/material';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    SharedMaterialModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [TaskDialogComponent],
  exports: [TaskDialogComponent]
})
export class TaskManagementUiTaskDialogModule {
}

import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import {
  AddTask,
  getAvailableTasks,
  LoadTask,
  RemoveTask,
  UpdateTask
} from '@mabna/task-management/store';
import { Task } from '@mabna/task-management/model';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../../../../ui/task-dialog/src/lib/task/task-dialog.component';

@Component({
  templateUrl: 'task-list.component.html',
  styleUrls: ['task-list.component.scss']
})
export class TaskListComponent implements OnDestroy {
  displayedColumns: string[] = ['title', 'deadline', 'action'];
  dataSource: Observable<Task[]>;
  private subscription: Subscription;

  constructor(private store: Store<Task[]>, public dialog: MatDialog) {
    this.store.dispatch(new LoadTask());
    this.dataSource = this.store.select(getAvailableTasks);
  }

  addTask(task: Task) {
    this.store.dispatch(new AddTask(task));
  }

  removeTask(id) {
    this.store.dispatch(new RemoveTask(id));
  }

  updateTask(task: Task) {
    this.store.dispatch(new UpdateTask(task));
  }

  openDialog(action, rowData) {
    const data = { ...rowData, action: action };
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '250px',
      data: data
    });

    this.subscription = dialogRef.afterClosed().subscribe((result) => {
      switch (result.event) {
        case 'Add':
          this.addTask(result.data);
          break;
        case 'Update':
          this.updateTask(result.data);
          break;
        case 'Delete':
          this.removeTask(result.data.id);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

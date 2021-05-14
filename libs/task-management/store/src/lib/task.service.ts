import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  LoadingDisable,
  LoadingEnable,
  LoadingState,
} from '@mabna/shared/store';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { NotificationService } from '@mabna/shared/core/services';

@Injectable()
export class TaskService {
  constructor(
    private http: HttpClient,
    private store: Store<LoadingState>,
    private notificationService: NotificationService
  ) {}

  enableLoading() {
    this.store.dispatch(new LoadingEnable());
  }

  disableLoading() {
    this.store.dispatch(new LoadingDisable());
  }

  loadTasks() {
    this.enableLoading();
    return this.http.get('/tasks').pipe(tap(() => this.disableLoading()));
  }

  addTask(task) {
    this.enableLoading();

    return this.http.post('/tasks', task).pipe(
      tap(() => {
        this.disableLoading();
        this.notificationService.showSuccess('Task created successfully');
      })
    );
  }

  removeTask(id) {
    this.enableLoading();

    return this.http.delete('/tasks/' + id).pipe(
      tap(() => {
        this.disableLoading();
        this.notificationService.showSuccess('Task removed successfully');
      })
    );
  }

  updateTask(task) {
    this.enableLoading();

    return this.http.put('/tasks', task).pipe(
      tap(() => {
        this.disableLoading();
        this.notificationService.showSuccess('Task updated successfully');
      })
    );
  }
}

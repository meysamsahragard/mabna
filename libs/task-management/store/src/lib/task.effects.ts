import { Injectable } from '@angular/core';
import { EMPTY, of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TaskService } from './task.service';
import {
  ADD_TASK,
  LOAD_TASK,
  REMOVE_TASK,
  TASK_ADDED,
  TASK_LOADED,
  TASK_REMOVED,
  TASK_UPDATED,
  UPDATE_TASK
} from './task.actions';

@Injectable()
export class TaskEffects {
  constructor(private actions: Actions, private taskService: TaskService) {
  }

  loadTasks$ = createEffect(() =>
    this.actions.pipe(
      ofType(LOAD_TASK),
      mergeMap(() =>
        this.taskService.loadTasks().pipe(
          map((tasks) => ({ type: TASK_LOADED, payload: tasks })),
          catchError((err) => throwError(err))
        )
      )
    )
  );

  addTask$ = createEffect(() =>
    this.actions.pipe(
      ofType(ADD_TASK),
      mergeMap((payload: any) =>
        this.taskService.addTask(payload.payload).pipe(
          map((task) => ({ type: TASK_ADDED, payload: task })),
          catchError((err) => throwError(err)) //
        )
      )
    )
  );

  removeTask$ = createEffect(() =>
    this.actions.pipe(
      ofType(REMOVE_TASK),
      mergeMap((payload: any) =>
        this.taskService.removeTask(payload.payload).pipe(
          map((task) => ({ type: TASK_REMOVED, payload: task })),
          catchError((err) => throwError(err))
        )
      )
    )
  );

  updateTask$ = createEffect(() =>
    this.actions.pipe(
      ofType(UPDATE_TASK),
      mergeMap((payload: any) =>
        this.taskService.updateTask(payload.payload).pipe(
          map((task) => ({ type: TASK_UPDATED, payload: task })),
          catchError((err) => throwError(err))
        )
      )
    )
  );
}

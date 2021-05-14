import { Action } from '@ngrx/store';
import { Task } from '@mabna/task-management/model';

export const ADD_TASK = '[Task] Add Task';
export const TASK_ADDED = '[Task] Task Added ';
export const REMOVE_TASK = '[Task] Remove Task';
export const TASK_REMOVED = '[Task] Task Removed';
export const UPDATE_TASK = '[Task] Update Task';
export const TASK_UPDATED = '[Task] Task Updated';
export const LOAD_TASK = '[Task] Load Task';
export const TASK_LOADED = '[Task] Task Loaded';

export class LoadTask implements Action {
  readonly type = LOAD_TASK;
}

export class TaskLoaded implements Action {
  readonly type = TASK_LOADED;

  constructor(public payload: Task[]) {}
}

export class AddTask implements Action {
  readonly type = ADD_TASK;

  constructor(public payload: Task) {}
}

export class TaskAdded implements Action {
  readonly type = TASK_ADDED;

  constructor(public payload: Task) {}
}

export class RemoveTask implements Action {
  readonly type = REMOVE_TASK;

  constructor(public payload: number) {}
}

export class TaskRemoved implements Action {
  readonly type = TASK_REMOVED;

  constructor(public payload: number) {}
}

export class UpdateTask implements Action {
  readonly type = UPDATE_TASK;

  constructor(public payload: Task) {}
}

export class TaskUpdated implements Action {
  readonly type = TASK_UPDATED;

  constructor(public payload: Task) {}
}

export type TaskActions =
  | AddTask
  | TaskAdded
  | RemoveTask
  | TaskRemoved
  | UpdateTask
  | TaskUpdated
  | LoadTask
  | TaskLoaded;

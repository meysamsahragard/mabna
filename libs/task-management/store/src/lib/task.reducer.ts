import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Task } from '@mabna/task-management/model';
import {
  TASK_ADDED,
  TASK_LOADED,
  TASK_REMOVED,
  TASK_UPDATED,
  TaskActions,
} from './task.actions';

const initialState: Task[] = [];

function remove(state, action) {
  const newState = [...state];
  const index = state.findIndex((item: Task) => item.id === action.payload);
  if (index !== -1) newState.splice(index, 1);
  return newState;
}

function update(state, action) {
  const newState = [...state];
  const index = state.findIndex((item: Task) => item.id === action.payload.id);
  newState[index] = action.payload;
  return newState;
}

export function taskReducer(state: Task[] = initialState, action: TaskActions) {
  switch (action.type) {
    case TASK_LOADED:
      return action.payload;
      break;
    case TASK_ADDED:
      return [...state, action.payload];
      break;
    case TASK_REMOVED:
      return remove(state, action);
      break;
    case TASK_UPDATED:
      return update(state, action);
      break;
    default: {
      return state;
    }
  }
}

export const getTaskState = createFeatureSelector<Task[]>('task');

export const getAvailableTasks = createSelector(
  getTaskState,
  (state: Task[]) => state
);

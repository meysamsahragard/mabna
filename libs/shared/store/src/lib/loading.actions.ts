import { Action } from '@ngrx/store';

export enum LoadingActionTypes {
  LOADING_ENABLE = '[Loading] Loading Enable',
  LOADING_DISABLE = '[Loading] Loading Disable',
}

export class LoadingEnable implements Action {
  readonly type = LoadingActionTypes.LOADING_ENABLE;
}

export class LoadingDisable implements Action {
  readonly type = LoadingActionTypes.LOADING_DISABLE;
}

export type LoadingActions = LoadingEnable | LoadingDisable;

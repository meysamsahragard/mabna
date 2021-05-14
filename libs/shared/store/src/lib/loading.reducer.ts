import { LoadingActions, LoadingActionTypes } from './loading.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface LoadingState {
  loading: boolean;
}

export const loadingInitialState: LoadingState = {
  loading: false,
};

export function LoadingReducer(
  state = loadingInitialState,
  action: LoadingActions
): LoadingState {
  switch (action.type) {
    case LoadingActionTypes.LOADING_ENABLE:
      {
        return {
          loading: true,
        };
      }
      break;
    case LoadingActionTypes.LOADING_DISABLE:
      {
        return {
          loading: false,
        };
      }
      break;
    default: {
      return state;
    }
  }
}

export const getLoadingState = createFeatureSelector<LoadingState>('loading');

export const getLoading = createSelector(
  getLoadingState,
  (state: LoadingState) => state.loading
);

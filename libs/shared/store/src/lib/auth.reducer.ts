import { User } from '@mabna/shared/model';
import { AuthActions, AuthActionTypes } from './auth.actions';

export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
};

export interface AuthState {
  authState: State;
}

export function AuthReducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS:
      {
        return {
          ...state,
          isAuthenticated: true,
          user: {
            token: action.payload.token,
            username: action.payload.username,
          },
        };
      }
      break;
    case AuthActionTypes.LOGIN_FAILURE:
      {
        return {
          ...state,
        };
      }
      break;
    case AuthActionTypes.LOGOUT:
      {
        return initialState;
      }
      break;
    default: {
      return state;
    }
  }
}

import { createReducer, on, Action } from '@ngrx/store';
import { User } from '../models/users';

import * as UsersActions from './users.actions';

export const USERS_FEATURE_KEY = 'users';

export interface UsersState {
  user: User;
  isAuthenticated: boolean;
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UsersState;
}

export const initialUsersState: UsersState = {
  user: new User(),
  isAuthenticated: false,
};

const reducer = createReducer(
  initialUsersState,
  on(UsersActions.buildUserSession, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(UsersActions.buildUserSession, (state) => ({ ...state })),
  on(UsersActions.buildUserSessionSuccess, (state, action) => ({
    ...state,
    user: action.user,
    isAuthenticated: true
  })),
  on(UsersActions.buildUserSessionFailure, (state) => ({
    ...state,
    user: new User(),
    isAuthenticated: false
  }))
);

export function usersReducer(state: UsersState | undefined, action: Action) {
  return reducer(state, action);
}

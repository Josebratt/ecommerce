import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as UsersActions from './users.actions';
import * as UsersSelectors from './users.selectors';

@Injectable()
export class UsersFacade {
  
  constructor(private readonly store: Store) {}

  currentUser$ = this.store.pipe(select(UsersSelectors.getUser));
  isAuthenticated$ = this.store.pipe(select(UsersSelectors.getUserIsAuth));

  buildUserSession() {
    this.store.dispatch(UsersActions.buildUserSession());
  }
}

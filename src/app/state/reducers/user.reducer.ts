import { ActionReducer } from '@ngrx/store';
import * as userActions from '../actions/user.actions';
import { User } from 'app/shared/models';


export type State = User[];

const intitialState: State = [];


export function reducer(state = intitialState, action: userActions.Actions) {
  switch (action.type) {
    case userActions.LIST_RESULT:
      return action.payload;
    default:
      return state;
  }
};

export const getUsers = (state: State) => state;

import { ActionReducer } from '@ngrx/store';
import * as sessionActions from '../actions/session.actions';
import { User } from 'app/shared/models/user';


export interface State {
  user: User;
}

const intitialState: State = {
  user: undefined
};


export function reducer(state = intitialState, action: sessionActions.Actions) {
  switch (action.type) {
    case sessionActions.SET_SESSION:
      return {
        user: action.payload
      }
    case sessionActions.CLEAR_SESSION:
      return {
        user: undefined
      }
    default:
      return state;
  }
};

export const getSession = (state: State) => state.user;

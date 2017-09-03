import { ActionReducer } from '@ngrx/store';
import * as userProfileActions from '../actions/user-profile.actions';
import { User } from 'app/shared/models/user';


export interface State {
  userProfile: User;
}

const intitialState: State = {
  userProfile: undefined
};


export function reducer(state = intitialState, action: userProfileActions.Actions) {
  switch (action.type) {
    case userProfileActions.SET_USER_PROFILE:
      return {
        userProfile: action.payload
      }
    case userProfileActions.CLEAR_USER_PROFILE:
      return {
        userProfile: undefined
      }
    default:
      return state;
  }
};

export const getUserProfile = (state: State) => state.userProfile;

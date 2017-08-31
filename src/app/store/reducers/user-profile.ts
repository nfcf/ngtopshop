import { ActionReducer } from '@ngrx/store';
import * as userProfileActions from '../actions/user-profile.actions';
import { UserProfile } from 'app/shared/models/user-profile';


export interface State {
  userProfile: UserProfile;
}

const intitialState: State = {
  userProfile: undefined
};


export function reducer(state = intitialState, action: userProfileActions.Actions) {
  console.log('Action came in! ' + action.type);
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

import { Action } from '@ngrx/store';
import { UserProfile } from 'app/shared/models/user-profile';

export const SET_USER_PROFILE = '[UserProfile] Set';
export const CLEAR_USER_PROFILE = '[UserProfile] Clear';

export class SetUserProfile implements Action {
  readonly type = SET_USER_PROFILE;
  constructor(public payload: UserProfile) {}
}

export class ClearUserProfile implements Action {
  readonly type = CLEAR_USER_PROFILE;
}

export type Actions = SetUserProfile | ClearUserProfile;

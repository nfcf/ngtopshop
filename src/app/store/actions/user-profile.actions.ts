import { Action } from '@ngrx/store';
import { User } from 'app/shared/models';

export const SET_USER_PROFILE = '[UserProfile] Set';
export const CLEAR_USER_PROFILE = '[UserProfile] Clear';

export class SetUserProfile implements Action {
  readonly type = SET_USER_PROFILE;
  constructor(public payload: User) {}
}

export class ClearUserProfile implements Action {
  readonly type = CLEAR_USER_PROFILE;
}

export type Actions = SetUserProfile | ClearUserProfile;

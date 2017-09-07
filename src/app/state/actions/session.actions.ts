import { Action } from '@ngrx/store';
import { User } from 'app/shared/models';

export const SET_SESSION = '[Session] Set';
export const CLEAR_SESSION = '[Session] Clear';

export class SetSession implements Action {
  readonly type = SET_SESSION;
  constructor(public payload: User) {}
}

export class ClearSession implements Action {
  readonly type = CLEAR_SESSION;
}

export type Actions = SetSession | ClearSession;

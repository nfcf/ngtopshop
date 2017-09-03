import { Action } from '@ngrx/store';
import { User } from 'app/shared/models';

export const LIST_REQUEST = '[User] List Request';
export const LIST_RESULT = '[User] List Result';
export const UPDATE = '[User] Update';

export class ListRequest implements Action {
  readonly type = LIST_REQUEST;
}

export class ListResult implements Action {
  readonly type = LIST_RESULT;
  constructor(public payload: User[]) {}
}

export class Update implements Action {
  readonly type = UPDATE;
  constructor(public payload: User) {}
}

export type Actions = ListRequest | ListResult | Update;

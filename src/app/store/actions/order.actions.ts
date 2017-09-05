import { Action } from '@ngrx/store';
import { Order } from 'app/shared/models';

export const LIST_REQUEST = '[Order] List Request';
export const LIST_RESULT = '[Order] List Result';
export const NEW = '[Order] New';
export const UPDATE = '[Order] Update';
export const DELETE = '[Order] Delete';

export class ListRequest implements Action {
  readonly type = LIST_REQUEST;
}

export class ListResult implements Action {
  readonly type = LIST_RESULT;
  constructor(public payload: Order[]) {}
}

export class New implements Action {
  readonly type = NEW;
  constructor(public payload: Order) {}
}

export class Update implements Action {
  readonly type = UPDATE;
  constructor(public payload: Order) {}
}

export class Delete implements Action {
  readonly type = DELETE;
  constructor(public payload: Order) {}
}

export type Actions = ListRequest | ListResult | New | Update | Delete;

import { Action } from '@ngrx/store';
import { Product } from 'app/shared/models';

export const LIST_REQUEST = '[Product] List Request';
export const LIST_RESULT = '[Product] List Result';
export const NEW = '[Product] New';
export const UPDATE = '[Produtc] Update';
export const DELETE = '[Product] Delete';

export class ListRequest implements Action {
  readonly type = LIST_REQUEST;
}

export class ListResult implements Action {
  readonly type = LIST_RESULT;
  constructor(public payload: Product[]) {}
}

export class New implements Action {
  readonly type = NEW;
  constructor(public payload: Product) {}
}

export class Update implements Action {
  readonly type = UPDATE;
  constructor(public payload: Product) {}
}

export class Delete implements Action {
  readonly type = DELETE;
  constructor(public payload: Product) {}
}

export type Actions = ListRequest | ListResult | New | Update | Delete;

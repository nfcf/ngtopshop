import { Action } from '@ngrx/store';
import { OrderItem } from 'app/shared/models';

export const ADD = '[Cart] New';
export const REMOVE = '[Cart] Update';
export const CLEAR = '[Cart] Delete';


export class Add implements Action {
  readonly type = ADD;
  constructor(public payload: OrderItem) {}
}

export class Remove implements Action {
  readonly type = REMOVE;
  constructor(public payload: OrderItem) {}
}

export class Clear implements Action {
  readonly type = CLEAR;
  constructor() {}
}

export type Actions = Add | Remove | Clear;

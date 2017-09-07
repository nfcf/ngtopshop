import { Action } from '@ngrx/store';
import { Product } from 'app/shared/models';

export const ADD = '[Cart] Add';
export const REMOVE = '[Cart] Remove';
export const CLEAR = '[Cart] Clear';


export class Add implements Action {
  readonly type = ADD;
  constructor(public payload: Product) {}
}

export class Remove implements Action {
  readonly type = REMOVE;
  constructor(public payload: Product) {}
}

export class Clear implements Action {
  readonly type = CLEAR;
  constructor() {}
}

export type Actions = Add | Remove | Clear;

import { ActionReducer } from '@ngrx/store';
import * as orderActions from '../actions/order.actions';
import { Order } from 'app/shared/models';


export type State = Order[];

const intitialState: State = [];


export function reducer(state = intitialState, action: orderActions.Actions) {
  switch (action.type) {
    case orderActions.LIST_RESULT:
      return action.payload;
    default:
      return state;
  }
};

export const getOrders = (state: State) => state;

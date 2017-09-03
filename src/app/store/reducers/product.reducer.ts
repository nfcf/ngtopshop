import { ActionReducer } from '@ngrx/store';
import * as productActions from '../actions/product.actions';
import { Product } from 'app/shared/models';


export type State = Product[];

const intitialState: State = [];


export function reducer(state = intitialState, action: productActions.Actions) {
  console.log('Action came in! ' + action.type);
  switch (action.type) {
    case productActions.LIST_RESULT:
      return action.payload;
    default:
      return state;
  }
};

export const getProducts = (state: State) => state;

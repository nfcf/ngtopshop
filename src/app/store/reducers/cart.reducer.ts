import { ActionReducer } from '@ngrx/store';
import * as cartActions from '../actions/cart.actions';
import { OrderItem } from 'app/shared/models';


export type State = OrderItem[];

const intitialState: State = [];


export function reducer(state = intitialState, action: cartActions.Actions) {
  switch (action.type) {
    case cartActions.ADD:
      const existingItemToAdd = state.find((item: OrderItem) => {
        return item.productId === action.payload.productId;
      });
      if (existingItemToAdd) {
        return state.map((item: OrderItem) => {
          existingItemToAdd.quantity++;
          return item.productId === action.payload.productId ? existingItemToAdd : item; }
        );
      } else {
        action.payload.quantity = 1;
        return [...state, action.payload];
      }
    case cartActions.REMOVE:
      const existingItemToRemove = state.find((item: OrderItem) => {
        return item.productId === action.payload.productId;
      });
      if (existingItemToRemove) {
        if (existingItemToRemove.quantity === 1) {
          return state.filter(item => item.productId !== action.payload.productId);
        } else {
          return state.map((item: OrderItem) => {
            existingItemToRemove.quantity--;
            return item.productId === action.payload.productId ? existingItemToRemove : item; }
          );
        }
      } else {
        return state;
      }
    case cartActions.CLEAR:
      return [];
    default:
      return state;
  }
};

export const getCart = (state: State) => state;

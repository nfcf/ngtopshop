import { ActionReducer } from '@ngrx/store';
import * as cartActions from '../actions/cart.actions';
import { OrderItem, Product } from 'app/shared/models';


export type State = OrderItem[];

const intitialState: State = [];


export function reducer(state = intitialState, action: cartActions.Actions) {
  switch (action.type) {
    case cartActions.ADD:
      const existingItemToAdd = state.find((item: OrderItem) => {
        return item.productId === action.payload.id;
      });
      if (existingItemToAdd) {
        return state.map((item: OrderItem) => {
          existingItemToAdd.quantity++;
          return item.productId === action.payload.id ? existingItemToAdd : item; }
        );
      } else {
        return [...state, { productId: action.payload.id, quantity: 1, price: action.payload.price }];
      }
    case cartActions.REMOVE:
      const existingItemToRemove = state.find((item: OrderItem) => {
        return item.productId === action.payload.id;
      });
      if (existingItemToRemove) {
        if (existingItemToRemove.quantity === 1) {
          return state.filter(item => item.productId !== action.payload.id);
        } else {
          return state.map((item: OrderItem) => {
            existingItemToRemove.quantity--;
            return item.productId === action.payload.id ? existingItemToRemove : item; }
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

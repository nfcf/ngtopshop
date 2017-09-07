import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from 'environments/environment';
import { RouterStateUrl } from 'app/shared/utils';
import * as fromRouter from '@ngrx/router-store';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */

import * as fromSession from './session.reducer';
import * as fromProduct from './product.reducer';
import * as fromUser from './user.reducer';
import * as fromOrder from './order.reducer';
import * as fromCart from './cart.reducer';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  session: fromSession.State;
  products: fromProduct.State;
  users: fromUser.State;
  orders: fromOrder.State;
  cart: fromCart.State;
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<State> = {
  session: fromSession.reducer,
  products: fromProduct.reducer,
  users: fromUser.reducer,
  orders: fromOrder.reducer,
  cart: fromCart.reducer,
  routerReducer: fromRouter.routerReducer,
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['session', 'products', 'users', 'orders', 'cart'],
    rehydrate: true,
    storageKeySerializer: (key) => 'ngrx_' + key })(reducer);
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [localStorageSyncReducer, logger]
  : [localStorageSyncReducer];

/**
 * Reducers
 */
export const getSessionState = createFeatureSelector<fromSession.State>('session');
export const getSession = createSelector(
  getSessionState,
  fromSession.getSession
);

export const getProductState = createFeatureSelector<fromProduct.State>('products');
export const getProduct = createSelector(
  getProductState,
  fromProduct.getProducts
);

export const getUserState = createFeatureSelector<fromUser.State>('users');
export const getUser = createSelector(
  getUserState,
  fromUser.getUsers
);

export const getOrderState = createFeatureSelector<fromOrder.State>('orders');
export const getOrder = createSelector(
  getOrderState,
  fromOrder.getOrders
);

export const getCartState = createFeatureSelector<fromCart.State>('cart');
export const getCart = createSelector(
  getCartState,
  fromCart.getCart
);

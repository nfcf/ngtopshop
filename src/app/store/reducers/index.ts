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

import * as fromUserProfile from './user-profile.reducer';
import * as fromProduct from './product.reducer';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  userProfile: fromUserProfile.State;
  products: fromProduct.State;
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<State> = {
  userProfile: fromUserProfile.reducer,
  products: fromProduct.reducer,
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
    keys: ['userProfile', 'products'],
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
 * UserProfile Reducers
 */
export const getUserProfileState = createFeatureSelector<fromUserProfile.State>('userProfile');
export const getUserProfile = createSelector(
  getUserProfileState,
  fromUserProfile.getUserProfile
);

export const getProductState = createFeatureSelector<fromProduct.State>('products');
export const getProduct = createSelector(
  getProductState,
  fromProduct.getProducts
);

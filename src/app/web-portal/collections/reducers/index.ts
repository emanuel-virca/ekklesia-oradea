import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import * as fromCollections from './collections.reducer';

export const featureKey = 'collections';

export interface State {
  [fromCollections.featureKey]: fromCollections.State;
}

export function reducers(state: State | undefined, action: Action) {
  return combineReducers({
    [fromCollections.featureKey]: fromCollections.reducer,
  })(state, action);
}

export const getFeatureState = createFeatureSelector<State>(featureKey);

import { Action, createFeatureSelector, combineReducers } from '@ngrx/store';

import * as fromResourceDetails from './resource-details.reducer';
import * as fromResources from './resources.reducer';

export const featureKey = 'resources';

export interface State {
  [fromResources.featureKey]: fromResources.State;
  [fromResourceDetails.featureKey]: fromResourceDetails.State;
}

export function reducers(state: State | undefined, action: Action) {
  return combineReducers({
    [fromResources.featureKey]: fromResources.reducer,
    [fromResourceDetails.featureKey]: fromResourceDetails.reducer,
  })(state, action);
}

export const getFeatureState = createFeatureSelector<State>(featureKey);

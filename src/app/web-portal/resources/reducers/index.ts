import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';

import * as fromRoot from '@root-state';
import * as fromResourceDetails from './resource.reducer';
import * as fromResources from './resources.reducer';

export interface ResourcesState {
  resources: fromResources.State;
  resourceDetails: fromResourceDetails.State; // resources page state
}

export interface State extends fromRoot.State {
  resources: ResourcesState;
}

export const reducers: ActionReducerMap<ResourcesState, any> = {
  resources: fromResources.reducer,
  resourceDetails: fromResourceDetails.reducer,
};

export const getResourcesFeatureState = createFeatureSelector<State, ResourcesState>('resources');

export const getResourceDetailsState = createSelector(
  getResourcesFeatureState,
  (state: ResourcesState) => state.resourceDetails
);

export const getCurrentResource = createSelector(
  getResourceDetailsState,
  fromResourceDetails.getCurrentResource
);

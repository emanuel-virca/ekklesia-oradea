import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';

import * as fromRoot from '@root-state';
import * as fromResources from './resources.reducer';

/**
 * Define Resources module main state
 */
export interface ResourcesState {
  resources: fromResources.State; // resources page state
}

// Extends the app state to include the author feature.
// This is required because resources are lazy loaded.
// So the reference to ResourceState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
  resources: ResourcesState;
}

export const reducers: ActionReducerMap<ResourcesState, any> = {
  resources: fromResources.resourceReducer,
};

export const getResourcesFeatureState = createFeatureSelector<State, ResourcesState>('resources');

export const getResourcesState = createSelector(
  getResourcesFeatureState,
  (state: ResourcesState) => state.resources
);

export const getCurrentResource = createSelector(
  getResourcesState,
  fromResources.getCurrentResource
);

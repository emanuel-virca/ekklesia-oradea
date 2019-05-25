import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '@root-state';
import * as resourceReducers from './resource.reducers';

// Extends the app state to include the author feature.
// This is required because resources are lazy loaded.
// So the reference to ResourceState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
  resources: resourceReducers.State;
}

export const getResourcesFeatureState = createFeatureSelector<resourceReducers.State>('resources');

export const getCurrentResource = createSelector(
  getResourcesFeatureState,
  state => state.currentResource
);

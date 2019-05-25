import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '@root-state';
import * as fromResources from './resource.reducers';

// Extends the app state to include the author feature.
// This is required because authors are lazy loaded.
// So the reference to AuthorState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
  resources: fromResources.ResourceState;
}

export const getResourcesFeatureState = createFeatureSelector<fromResources.ResourceState>('resources');

export const getResources = createSelector(
  getResourcesFeatureState,
  state => state.resources
);

export const getCurrentResource = createSelector(
  getResourcesFeatureState,
  state => state.currentResource
);

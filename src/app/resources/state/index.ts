import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../state/app.state';
import * as resourceReducers from './resource.reducers';

// Extends the app state to include the author feature.
// This is required because resources are lazy loaded.
// So the reference to ResourceState cannot be added to app.state.ts directly.
export interface AppState extends fromRoot.AppState {
  resources: resourceReducers.ResourceState;
}

export const getResourcesFeatureState = createFeatureSelector<resourceReducers.ResourceState>('resources');

export const getCurrentResource = createSelector(getResourcesFeatureState, state => state.currentResource);

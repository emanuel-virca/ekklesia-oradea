import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';

import * as fromRoot from '@root-state';
import * as fromResourceDetails from './resource.reducer';
import * as fromResources from './resources.reducer';
import * as fromCollections from './collections.reducer';

/**
 * Define Resources module main state
 */
export interface ResourcesState {
  resources: fromResources.State;
  resourceDetails: fromResourceDetails.State; // resources page state
  collections: fromCollections.State;
}

// Extends the app state to include the author feature.
// This is required because resources are lazy loaded.
// So the reference to ResourceState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
  resources: ResourcesState;
}

export const reducers: ActionReducerMap<ResourcesState, any> = {
  resources: fromResources.reducer,
  resourceDetails: fromResourceDetails.reducer,
  collections: fromCollections.reducer,
};

export const getResourcesFeatureState = createFeatureSelector<State, ResourcesState>('resources');

export const getResourcesState = createSelector(
  getResourcesFeatureState,
  (state: ResourcesState) => state.resources
);

export const getResources = createSelector(
  getResourcesState,
  fromResources.getResources
);

export const getResourcesIsFetching = createSelector(
  getResourcesState,
  fromResources.getIsFetching
);

export const getResourcesNextPage = createSelector(
  getResourcesState,
  fromResources.getNextPage
);

export const getResourcesOrderByDirection = createSelector(
  getResourcesState,
  fromResources.getOrderByDirection
);

export const getResourceDetailsState = createSelector(
  getResourcesFeatureState,
  (state: ResourcesState) => state.resourceDetails
);

export const getCurrentResource = createSelector(
  getResourceDetailsState,
  fromResourceDetails.getCurrentResource
);

// collections
export const getCollectionsState = createSelector(
  getResourcesFeatureState,
  (state: ResourcesState) => state.collections
);

export const getLikedResources = createSelector(
  getCollectionsState,
  fromCollections.getLikedResources
);

export const getLikedResourcesOrderByDirection = createSelector(
  getCollectionsState,
  fromCollections.getOrderByDirection
);

export const getLikedResourcesNextPage = createSelector(
  getCollectionsState,
  fromCollections.getLikedResourcesNextPage
);

export const getLikedResourceIds = createSelector(
  getCollectionsState,
  fromCollections.getLikedResourceIds
);

export const getLikedResourcesIsFetching = createSelector(
  getCollectionsState,
  fromCollections.geIsLikedFetching
);

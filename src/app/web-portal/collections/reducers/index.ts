import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';

import * as fromRoot from '@root-state';
import * as fromCollections from './collections.reducer';

/**
 * Define Resources module main state
 */
export interface CollectionsState {
  collections: fromCollections.State;
}

export interface State extends fromRoot.State {
  collections: CollectionsState;
}

export const reducers: ActionReducerMap<CollectionsState, any> = {
  collections: fromCollections.reducer,
};

export const getCollectionsFeatureState = createFeatureSelector<State, CollectionsState>('collections');

export const getCollectionsState = createSelector(
  getCollectionsFeatureState,
  (state: CollectionsState) => state.collections
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

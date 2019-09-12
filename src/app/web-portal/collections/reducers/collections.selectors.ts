import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CollectionsState } from '.';

const getCollectionsFeatureState = createFeatureSelector<CollectionsState>('collections');

const getState = createSelector(
  getCollectionsFeatureState,
  state => state.collections
);

const getEntities = createSelector(
  getState,
  state => state.entities
);

const getIsFetching = createSelector(
  getState,
  state => state.isFetching
);

const getNextPage = createSelector(
  getState,
  state => state.startAfter
);

const getOrderByDirection = createSelector(
  getState,
  state => state.orderByDirection
);

const getEntityIds = createSelector(
  getState,
  state => state.entityIds
);

export const collectionsQuery = {
  getState,
  getEntities,
  getIsFetching,
  getNextPage,
  getOrderByDirection,
  getEntityIds,
};

import { createSelector } from '@ngrx/store';

import { getFeatureState } from '.';

export const getState = createSelector(
  getFeatureState,
  state => state.resources
);

export const getEntities = createSelector(
  getState,
  state => state.entities
);

export const getIsFetching = createSelector(
  getState,
  state => state.isFetching
);

export const getNextPage = createSelector(
  getState,
  state => state.startAfter
);

export const getOrderByDirection = createSelector(
  getState,
  state => state.orderByDirection
);

export const getIsInitialFetching = createSelector(
  getState,
  state => !state.currentPage
);

export const resourcesQuery = {
  getState,
  getEntities,
  getIsFetching,
  getNextPage,
  getOrderByDirection,
  getIsInitialFetching,
};

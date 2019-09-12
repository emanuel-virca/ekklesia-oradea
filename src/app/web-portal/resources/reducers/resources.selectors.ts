import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ResourcesState } from '.';

export const getResourcesFeatureState = createFeatureSelector<ResourcesState>('resources');

export const getState = createSelector(
  getResourcesFeatureState,
  (state: ResourcesState) => state.resources
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

export const resourcesQuery = {
  getState,
  getEntities,
  getIsFetching,
  getNextPage,
  getOrderByDirection,
};

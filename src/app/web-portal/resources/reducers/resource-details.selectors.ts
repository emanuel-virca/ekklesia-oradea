import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ResourcesState } from '.';

const getResourcesFeatureState = createFeatureSelector<ResourcesState>('resources');

const getState = createSelector(
  getResourcesFeatureState,
  (state: ResourcesState) => state.resourceDetails
);

const getCurrent = createSelector(
  getState,
  state => state.currentResource
);

export const resourceQuery = {
  getState,
  getCurrent,
};

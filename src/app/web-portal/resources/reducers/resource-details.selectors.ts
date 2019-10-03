import { createSelector } from '@ngrx/store';

import { getFeatureState } from '.';

const getState = createSelector(
  getFeatureState,
  state => state.resourceDetails
);

const getCurrent = createSelector(
  getState,
  state => state.currentResource
);

export const resourceQuery = {
  getState,
  getCurrent,
};

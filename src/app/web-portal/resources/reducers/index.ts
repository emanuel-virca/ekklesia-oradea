import { ActionReducerMap } from '@ngrx/store';

import * as fromRoot from '@root-state';
import * as fromResourceDetails from './resource-details.reducer';
import * as fromResources from './resources.reducer';

export interface ResourcesState {
  resources: fromResources.State;
  resourceDetails: fromResourceDetails.State;
}

export interface State extends fromRoot.State {
  resources: ResourcesState;
}

export const reducers: ActionReducerMap<ResourcesState, any> = {
  resources: fromResources.reducer,
  resourceDetails: fromResourceDetails.reducer,
};

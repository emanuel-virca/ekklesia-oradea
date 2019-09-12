import { ActionReducerMap } from '@ngrx/store';

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

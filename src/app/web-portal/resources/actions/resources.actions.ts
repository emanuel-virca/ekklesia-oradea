import { createAction, union, props } from '@ngrx/store';

export const loadResources = createAction(
  '[Resources] Load Resources',
  props<{ pageSize: number; orderByDirection: firebase.firestore.OrderByDirection }>()
);
export const loadNextResources = createAction('[Resources] Load Next Resources');
export const clearResources = createAction('[Resources] Clear Resources');

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
const all = union({ loadResources, loadNextResources, clearResources });

export type ResourcesActionsUnion = typeof all;

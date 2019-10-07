import { createAction, union, props } from '@ngrx/store';
import { Resource } from '@shared/models/resource';

export const loadResourcesSuccess = createAction(
  '[Resources/API] Load Resources Success',
  props<{ resources: Resource[] }>()
);

export const loadResourcesFailure = createAction(
  '[Resources/API] Load Resources Failure',
  props<{ errorMsg: string }>()
);

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
const all = union({ loadResourcesSuccess, loadResourcesFailure });

export type ResourcesApiActionsUnion = typeof all;

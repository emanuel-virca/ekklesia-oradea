import { createAction, union, props } from '@ngrx/store';
import { Resource } from '@shared/models/resource.model';

export const loadResourceSuccess = createAction(
  '[Resource/API] Load Resource Success',
  props<{ resource: Resource }>()
);
export const loadResourceFailure = createAction('[Resource/API] Load Resource Failure', props<{ errorMsg: string }>());

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
const all = union({
  loadResourceSuccess,
  loadResourceFailure,
});

export type ResourceApiActionsUnion = typeof all;

import { createAction, union, props } from '@ngrx/store';
import { Resource } from '@shared/models/resource.model';

export const loadResourceSuccess = createAction(
  '[Resource/API] Load Resource Success',
  props<{ resource: Resource }>()
);
export const loadResourceFailure = createAction('[Resource/API] Load Resource Failure', props<{ errorMsg: string }>());

export const saveResourceToLibrarySuccess = createAction(
  '[Resource/API] Save Resource To Library Success',
  props<{ resource: Resource }>()
);
export const saveResourceToLibraryFailure = createAction(
  '[Resource/API] Save Resource To Library Failure',
  props<{ errorMsg: string }>()
);

export const removeResourceFromLibrarySuccess = createAction(
  '[Resource/API] Remove Resource From Library Success',
  props<{ resource: Resource }>()
);
export const removeResourceFromLibraryFailure = createAction(
  '[Resource/API] Remove Resource From Library Failure',
  props<{ errorMsg: string }>()
);

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
const all = union({
  loadResourceSuccess,
  loadResourceFailure,
  saveResourceToLibrarySuccess,
  saveResourceToLibraryFailure,
  removeResourceFromLibrarySuccess,
  removeResourceFromLibraryFailure,
});

export type ResourceApiActionsUnion = typeof all;

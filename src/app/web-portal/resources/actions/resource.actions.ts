import { createAction, union, props } from '@ngrx/store';
import { Resource } from '@shared/models/resource.model';

export const selectResource = createAction('[Resource] Select Resource', props<{ id: string }>());
export const clearSelectedResource = createAction('[Resource] Clear Selected Resource');
export const saveResourceToLibrary = createAction(
  '[Resource] Save Resource To Library',
  props<{ resource: Resource }>()
);
export const removeResourceFromLibrary = createAction(
  '[Resource] Remove Resource From Library',
  props<{ resource: Resource }>()
);

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
const all = union({ selectResource, clearSelectedResource, saveResourceToLibrary, removeResourceFromLibrary });

export type ResourceActionsUnion = typeof all;

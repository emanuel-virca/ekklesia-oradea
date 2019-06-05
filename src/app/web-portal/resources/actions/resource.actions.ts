import { createAction, union, props } from '@ngrx/store';

export const selectResource = createAction('[Resource] Select Resource', props<{ id: string }>());
export const clearSelectedResource = createAction('[Resource] Clear Selected Resource');

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
const all = union({ selectResource, clearSelectedResource });

export type ResourceActionsUnion = typeof all;

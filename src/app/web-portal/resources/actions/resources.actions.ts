import { createAction, union } from '@ngrx/store';

export const loadResources = createAction('[Resources] Load Resources');

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
const all = union({ loadResources });

export type ResourcesActionsUnion = typeof all;

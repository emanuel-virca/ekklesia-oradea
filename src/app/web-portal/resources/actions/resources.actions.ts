import { createAction, union, props } from '@ngrx/store';
import { OrderByDirection } from '@web-portal/shared/models/order-by-direction';

export const loadResources = createAction('[Resources] Load Resources');
export const loadNextResources = createAction('[Resources] Load Next Resources');
export const changeResourceOrderDirection = createAction(
  '[Resources] Change Resources Order Direction',
  props<{ orderByDirection: OrderByDirection }>()
);
export const changeResourceOrderBy = createAction(
  '[Resources] Change Resources Order By',
  props<{ orderBy: string }>()
);
export const clearResources = createAction('[Resources] Clear Resources');

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
const all = union({
  loadResources,
  loadNextResources,
  changeResourceOrderDirection,
  changeResourceOrderBy,
  clearResources,
});

export type ResourcesActionsUnion = typeof all;

import { createAction, union, props } from '@ngrx/store';
import { Resource } from '@shared/models/resource.model';
import { OrderByDirection } from '@web-portal/shared/models/order-by-direction';

export const clearLikedResources = createAction('[Collections] Clear Liked Resources');

export const loadLikedResources = createAction('[Collections] Load Liked Resources');

export const changeOrderDirection = createAction(
  '[Collections/Liked] Change Order Direction',
  props<{ orderByDirection: OrderByDirection }>()
);
export const changeOrderBy = createAction('[Collections/Liked] Change Order By', props<{ orderBy: string }>());

export const addToLikedResources = createAction(
  '[Collections] Add To Liked Resources',
  props<{ resource: Resource }>()
);
export const removeFromLikedResources = createAction(
  '[Collections] Remove From Liked Resource',
  props<{ resource: Resource }>()
);

export const loadLikedResourceIds = createAction('[Collections] Load Liked Resource Ids');

const all = union({
  clearLikedResources,
  loadLikedResources,
  addToLikedResources,
  removeFromLikedResources,
  loadLikedResourceIds,
  changeOrderDirection,
  changeOrderBy,
});

export type CollectionsActionsUnion = typeof all;

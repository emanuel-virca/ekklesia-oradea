import { createAction, union, props } from '@ngrx/store';

import { Resource } from '@shared/models/resource';
import { LikedResource } from '@web-portal/shared/models/liked-resource.model';

export const loadLikedResourcesSuccess = createAction(
  '[Collections/API] Load Liked Resources Success',
  props<{ likedResources: LikedResource[] }>()
);

export const loadLikedResourcesFailure = createAction(
  '[Collections/API] Load Liked Resources Failure',
  props<{ errorMsg: string }>()
);

export const addToLikedResourcesSuccess = createAction(
  '[Collections/API] Add To Liked Resources Success',
  props<{ resource: Resource }>()
);
export const addToLikedResourcesFailure = createAction(
  '[Collections/API] Add To Liked Resources Failure',
  props<{ errorMsg: string }>()
);

export const removeFromLikedResourcesSuccess = createAction(
  '[Collections/API] Remove From Liked Resources Success',
  props<{ resource: Resource }>()
);

export const removeFromLikedResourcesFailure = createAction(
  '[Collections/API] Remove From Liked Resources Failure',
  props<{ errorMsg: string }>()
);

export const loadLikedResourceIdsSuccess = createAction(
  '[Collections/API] Load Liked Resource Ids Success',
  props<{ resourceIds: string[] }>()
);

export const loadLikedResourceIdsFailure = createAction(
  '[Collections/API] Load Liked Resource Ids Failure',
  props<{ resourceIds: string[] }>()
);

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
const all = union({
  loadLikedResourcesSuccess,
  loadLikedResourcesFailure,
  addToLikedResourcesSuccess,
  addToLikedResourcesFailure,
  removeFromLikedResourcesSuccess,
  removeFromLikedResourcesFailure,
  loadLikedResourceIdsSuccess,
  loadLikedResourceIdsFailure,
});

export type CollectionsApiActionsUnion = typeof all;

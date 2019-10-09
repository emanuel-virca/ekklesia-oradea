import { createAction, union, props } from '@ngrx/store';

import { Resource, ResourceSnippet } from '@shared/models/resource';
import { UserLikes } from '@shared/models/user-likes';

export const loadLikedResourcesSuccess = createAction(
  '[Collections/API] Load Liked Resources Success',
  props<{ likedResources: ResourceSnippet[] }>()
);

export const loadLikedResourcesFailure = createAction(
  '[Collections/API] Load Liked Resources Failure',
  props<{ errorMsg: string }>()
);

export const addToLikedResourcesSuccess = createAction(
  '[Collections/API] Add To Liked Resources Success',
  props<{ resource: Resource | ResourceSnippet }>()
);
export const addToLikedResourcesFailure = createAction(
  '[Collections/API] Add To Liked Resources Failure',
  props<{ errorMsg: string }>()
);

export const removeFromLikedResourcesSuccess = createAction(
  '[Collections/API] Remove From Liked Resources Success',
  props<{ resource: Resource | ResourceSnippet }>()
);

export const removeFromLikedResourcesFailure = createAction(
  '[Collections/API] Remove From Liked Resources Failure',
  props<{ errorMsg: string }>()
);

export const loadLikedResourceIdsSuccess = createAction(
  '[Collections/API] Load Liked Resource Ids Success',
  props<UserLikes>()
);

export const loadLikedResourceIdsFailure = createAction(
  '[Collections/API] Load Liked Resource Ids Failure',
  props<{ errorMsg: string }>()
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

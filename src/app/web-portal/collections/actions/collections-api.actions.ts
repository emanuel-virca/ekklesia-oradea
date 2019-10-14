import { createAction, union, props } from '@ngrx/store';

import { Resource, ResourceSnippet } from '@shared/models/resource';
import { UserLikes } from '@shared/models/user-likes';
import { LibraryResource } from '@shared/models/library';

export const loadLibraryResourcesSuccess = createAction(
  '[Collections/API] Load Library Resources Success',
  props<{ likedResources: LibraryResource[] }>()
);

export const loadLibraryResourcesFailure = createAction(
  '[Collections/API] Load Library Resources Failure',
  props<{ errorMsg: string }>()
);

export const addToLibrarySuccess = createAction(
  '[Collections/API] Add To Library Success',
  props<{ resource: Resource | ResourceSnippet; libraryId: string }>()
);
export const addToLibraryFailure = createAction(
  '[Collections/API] Add To Library Failure',
  props<{ errorMsg: string }>()
);

export const removeFromLibrarySuccess = createAction(
  '[Collections/API] Remove From Library Success',
  props<{ resource: Resource | ResourceSnippet; libraryId: string }>()
);

export const removeFromLibraryFailure = createAction(
  '[Collections/API] Remove From Library Failure',
  props<{ errorMsg: string }>()
);

export const loadUserLikesSuccess = createAction('[Collections/API] Load User Likes Success', props<UserLikes>());

export const loadUserLikesFailure = createAction(
  '[Collections/API] Load User Likes Failure',
  props<{ errorMsg: string }>()
);

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
const all = union({
  loadLibraryResourcesSuccess,
  loadLibraryResourcesFailure,
  addToLibrarySuccess,
  addToLibraryFailure,
  removeFromLibrarySuccess,
  removeFromLibraryFailure,
  loadUserLikesSuccess,
  loadUserLikesFailure,
});

export type CollectionsApiActionsUnion = typeof all;

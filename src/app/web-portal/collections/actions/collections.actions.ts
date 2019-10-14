import { createAction, union, props } from '@ngrx/store';

import { Resource, ResourceSnippet } from '@shared/models/resource';
import { OrderByDirection } from '@web-portal/shared/models/order-by-direction';

export const clearLibraryResources = createAction(
  '[Collections] Clear Library Resources',
  props<{ libraryId: string }>()
);

export const loadLibraryResources = createAction(
  '[Collections] Load Library Resources',
  props<{ libraryId: string }>()
);

export const changeOrderDirection = createAction(
  '[Collections] Change Order Direction',
  props<{ orderByDirection: OrderByDirection; libraryId: string }>()
);

export const changeOrderBy = createAction(
  '[Collections] Change Library Order By',
  props<{ orderBy: string; libraryId: string }>()
);

export const addToLibrary = createAction(
  '[Collections] Add To Library',
  props<{ resource: Resource | ResourceSnippet; libraryId: string }>()
);

export const removeFromLibrary = createAction(
  '[Collections] Remove From Library',
  props<{ resource: Resource | ResourceSnippet; libraryId: string }>()
);

export const loadUserLikes = createAction('[Collections] Load User Likes');

const all = union({
  clearLibraryResources,
  loadLibraryResources,
  addToLibrary,
  removeFromLibrary,
  loadUserLikes,
  changeOrderDirection,
  changeOrderBy,
});

export type CollectionsActionsUnion = typeof all;

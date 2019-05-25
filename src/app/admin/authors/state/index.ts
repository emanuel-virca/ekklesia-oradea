import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '@root-state';
import * as fromAuthors from './author.reducers';

// Extends the app state to include the author feature.
// This is required because authors are lazy loaded.
// So the reference to AuthorState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
  authors: fromAuthors.AuthorState;
}

export const getAuthorsFeatureState = createFeatureSelector<fromAuthors.AuthorState>('authors');

export const getAuthors = createSelector(
  getAuthorsFeatureState,
  state => state.authors
);

export const getCurrentAuthor = createSelector(
  getAuthorsFeatureState,
  state => state.currentAuthor
);

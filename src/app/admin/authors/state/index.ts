import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../../state/app.state';
import * as fromAuthors from './author.reducers';

// Extends the app state to include the author feature.
// This is required because authors are lazy loaded.
// So the reference to AuthorState cannot be added to app.state.ts directly.
export interface AppState extends fromRoot.AppState {
    authors: fromAuthors.AuthorState;
}

export const getAuthorsFeatureState = createFeatureSelector<fromAuthors.AuthorState>('authors');

export const getAuthors = createSelector(getAuthorsFeatureState, state => state.authors);

export const getCurrentAuthor = createSelector(getAuthorsFeatureState, state => state.currentAuthor);

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as authorActions from './author.actions';
import { AuthorService } from '../services/author/author.service';
import { Author } from '@shared/models/author.model';

@Injectable()
export class AuthorEffects {
  constructor(private actions$: Actions, private authorService: AuthorService) {}

  @Effect()
  loadAuthors$: Observable<Action> = this.actions$.pipe(
    ofType(authorActions.LOAD_AUTHORS),
    switchMap(action =>
      this.authorService.query().pipe(
        map(authors => new authorActions.LoadAuthorsSuccess(authors)),
        catchError(err => of(new authorActions.LoadAuthorsFail(err)))
      )
    )
  );

  @Effect()
  deleteAuthor$: Observable<Action> = this.actions$.pipe(
    ofType(authorActions.DELETE_AUTHOR),
    map((action: authorActions.DeleteAuthor) => action.payload),
    switchMap(async (authorId: string) => {
      try {
        await this.authorService.deleteAsync(authorId);
        return new authorActions.DeleteAuthorSuccess(authorId);
      } catch (err) {
        return new authorActions.DeleteAuthorFail(err);
      }
    })
  );

  @Effect()
  updateAuthor$: Observable<Action> = this.actions$.pipe(
    ofType(authorActions.UPDATE_AUTHOR),
    map((action: authorActions.UpdateAuthor) => action.payload),
    switchMap(async (author: Author) => {
      try {
        await this.authorService.updateAsync(author);
        return new authorActions.UpdateAuthorSuccess(author);
      } catch (err) {
        return new authorActions.UpdateAuthorFail(err);
      }
    })
  );

  @Effect()
  createAuthor$: Observable<Action> = this.actions$.pipe(
    ofType(authorActions.CREATE_AUTHOR),
    map((action: authorActions.CreateAuthor) => action.payload),
    switchMap(async (author: Author) => {
      try {
        await this.authorService.createAsync(author);
        return new authorActions.CreateAuthorSuccess(author);
      } catch (err) {
        return new authorActions.CreateAuthorFail(err);
      }
    })
  );

  @Effect()
  loadAuthor$: Observable<Action> = this.actions$.pipe(
    ofType(authorActions.LOAD_AUTHOR),
    map((action: authorActions.LoadAuthor) => action.payload),
    switchMap(authorId =>
      this.authorService.get(authorId).pipe(
        map((author: Author) => new authorActions.LoadAuthorSuccess(author)),
        catchError(err => of(new authorActions.LoadAuthorFail(err)))
      )
    )
  );
}

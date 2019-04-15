import { Action } from '@ngrx/store';

import { Author } from '@shared/models/author.model';

export const LOAD_AUTHORS = 'LOAD AUTHORS';
export const LOAD_AUTHORS_SUCCESS = 'LOAD AUTHORS SUCCESS';
export const LOAD_AUTHORS_FAIL = 'LOAD AUTHORS FAIL';

export class LoadAuthors implements Action {
  readonly type = LOAD_AUTHORS;
}

export class LoadAuthorsSuccess implements Action {
  readonly type = LOAD_AUTHORS_SUCCESS;
  constructor(public payload: Author[]) {}
}

export class LoadAuthorsFail implements Action {
  readonly type = LOAD_AUTHORS_FAIL;
  constructor(public payload: string) {}
}

export const LOAD_AUTHOR = 'LOAD AUTHOR';
export const LOAD_AUTHOR_SUCCESS = 'LOAD AUTHOR SUCCESS';
export const LOAD_AUTHOR_FAIL = 'LOAD AUTHOR FAIL';

export class LoadAuthor implements Action {
  readonly type = LOAD_AUTHOR;
  constructor(public payload: string) {}
}

export class LoadAuthorSuccess implements Action {
  readonly type = LOAD_AUTHOR_SUCCESS;
  constructor(public payload: Author) {}
}

export class LoadAuthorFail implements Action {
  readonly type = LOAD_AUTHOR_FAIL;
  constructor(public payload: string) {}
}

export const SET_CURRENT_AUTHOR = 'SET CURRENT AUTHOR';
export class SetCurrentAuthor implements Action {
  readonly type = SET_CURRENT_AUTHOR;
  constructor(public payload: Author) {}
}

export const CREATE_AUTHOR = 'CREATE AUTHOR';
export const CREATE_AUTHOR_SUCCESS = 'CREATE AUTHOR SUCCESS';
export const CREATE_AUTHOR_FAIL = 'CREATE AUTHOR FAIL';

export class CreateAuthor implements Action {
  readonly type = CREATE_AUTHOR;
  constructor(public payload: Author) {}
}

export class CreateAuthorSuccess implements Action {
  readonly type = CREATE_AUTHOR_SUCCESS;
  constructor(public payload: any) {}
}

export class CreateAuthorFail implements Action {
  readonly type = CREATE_AUTHOR_FAIL;
  constructor(public payload: string) {}
}

export const UPDATE_AUTHOR = 'UPDATE AUTHOR';
export const UPDATE_AUTHOR_SUCCESS = 'UPDATE AUTHOR SUCCESS';
export const UPDATE_AUTHOR_FAIL = 'UPDATE AUTHOR FAIL';

export class UpdateAuthor implements Action {
  readonly type = UPDATE_AUTHOR;
  constructor(public payload: Author) {}
}

export class UpdateAuthorSuccess implements Action {
  readonly type = UPDATE_AUTHOR_SUCCESS;
  constructor(public payload: Author) {}
}

export class UpdateAuthorFail implements Action {
  readonly type = UPDATE_AUTHOR_FAIL;
  constructor(public payload: string) {}
}

export const DELETE_AUTHOR = 'DELETE AUTHOR';
export const DELETE_AUTHOR_SUCCESS = 'DELETE AUTHOR SUCCESS';
export const DELETE_AUTHOR_FAIL = 'DELETE AUTHOR FAIL';

export class DeleteAuthor implements Action {
  readonly type = DELETE_AUTHOR;
  constructor(public payload: string) {}
}

export class DeleteAuthorSuccess implements Action {
  readonly type = DELETE_AUTHOR_SUCCESS;
  constructor(public payload: string) {}
}

export class DeleteAuthorFail implements Action {
  readonly type = DELETE_AUTHOR_FAIL;
  constructor(public payload: string) {}
}

export type Actions =
  | LoadAuthors
  | LoadAuthorsSuccess
  | LoadAuthorsFail
  | LoadAuthor
  | LoadAuthorSuccess
  | LoadAuthorFail
  | SetCurrentAuthor
  | CreateAuthor
  | CreateAuthorSuccess
  | CreateAuthorFail
  | UpdateAuthor
  | UpdateAuthorSuccess
  | UpdateAuthorFail
  | DeleteAuthor
  | DeleteAuthorSuccess
  | DeleteAuthorFail;

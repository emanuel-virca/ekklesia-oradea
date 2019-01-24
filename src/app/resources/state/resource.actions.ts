import { Action } from '@ngrx/store';
import { Resource } from 'src/app/shared/models/resource.model';

export const LOAD_RESOURCE = 'LOAD RESOURCE';
export const LOAD_RESOURCE_SUCCESS = 'LOAD RESOURCE SUCCESS';
export const LOAD_RESOURCE_FAIL = 'LOAD RESOURCE FAIL';

export class LoadResource implements Action {
  readonly type = LOAD_RESOURCE;
  constructor(public payload: string) { }
}

export class LoadResourceSuccess implements Action {
  readonly type = LOAD_RESOURCE_SUCCESS;
  constructor(public payload: Resource) { }
}

export class LoadResourceFail implements Action {
  readonly type = LOAD_RESOURCE_FAIL;
  constructor(public payload: string) { }
}

export type Actions = LoadResource | LoadResourceSuccess | LoadResourceFail;

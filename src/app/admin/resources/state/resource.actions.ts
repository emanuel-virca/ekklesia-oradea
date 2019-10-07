import { Action } from '@ngrx/store';

import { Resource } from '@shared/models/resource';

export const LOAD_RESOURCES = 'LOAD RESOURCES';
export const LOAD_RESOURCES_SUCCESS = 'LOAD RESOURCES SUCCESS';
export const LOAD_RESOURCES_FAIL = 'LOAD RESOURCES FAIL';

export class LoadResources implements Action {
  readonly type = LOAD_RESOURCES;
}

export class LoadResourcesSuccess implements Action {
  readonly type = LOAD_RESOURCES_SUCCESS;
  constructor(public payload: Resource[]) {}
}

export class LoadResourcesFail implements Action {
  readonly type = LOAD_RESOURCES_FAIL;
  constructor(public payload: string) {}
}

export const LOAD_RESOURCE = 'LOAD RESOURCE';
export const LOAD_RESOURCE_SUCCESS = 'LOAD RESOURCE SUCCESS';
export const LOAD_RESOURCE_FAIL = 'LOAD RESOURCE FAIL';

export class LoadResource implements Action {
  readonly type = LOAD_RESOURCE;
  constructor() {}
}

export class LoadResourceSuccess implements Action {
  readonly type = LOAD_RESOURCE_SUCCESS;
  constructor(public payload: Resource) {}
}

export class LoadResourceFail implements Action {
  readonly type = LOAD_RESOURCE_FAIL;
  constructor(public payload: string) {}
}

export const CREATE_RESOURCE = 'CREATE RESOURCE';
export const CREATE_RESOURCE_SUCCESS = 'CREATE RESOURCE SUCCESS';
export const CREATE_RESOURCE_FAIL = 'CREATE RESOURCE FAIL';

export class CreateResource implements Action {
  readonly type = CREATE_RESOURCE;
  constructor(public payload: Resource) {}
}

export class CreateResourceSuccess implements Action {
  readonly type = CREATE_RESOURCE_SUCCESS;
  constructor(public payload: Resource) {}
}

export class CreateResourceFail implements Action {
  readonly type = CREATE_RESOURCE_FAIL;
  constructor(public payload: string) {}
}

export const UPDATE_RESOURCE = 'UPDATE RESOURCE';
export const UPDATE_RESOURCE_SUCCESS = 'UPDATE RESOURCE SUCCESS';
export const UPDATE_RESOURCE_FAIL = 'UPDATE RESOURCE FAIL';

export class UpdateResource implements Action {
  readonly type = UPDATE_RESOURCE;
  constructor(public payload: Resource) {}
}

export class UpdateResourceSuccess implements Action {
  readonly type = UPDATE_RESOURCE_SUCCESS;
  constructor(public payload: Resource) {}
}

export class UpdateResourceFail implements Action {
  readonly type = UPDATE_RESOURCE_FAIL;
  constructor(public payload: string) {}
}

export const DELETE_RESOURCE = 'DELETE RESOURCE';
export const DELETE_RESOURCE_SUCCESS = 'DELETE RESOURCE SUCCESS';
export const DELETE_RESOURCE_FAIL = 'DELETE RESOURCE FAIL';

export class DeleteResource implements Action {
  readonly type = DELETE_RESOURCE;
  constructor(public payload: string) {}
}

export class DeleteResourceSuccess implements Action {
  readonly type = DELETE_RESOURCE_SUCCESS;
}

export class DeleteResourceFail implements Action {
  readonly type = DELETE_RESOURCE_FAIL;
  constructor(public payload: string) {}
}

export const SET_CURRENT_RESOURCE = 'SET CURRENT RESOURCE';

export class SetCurrentResource implements Action {
  readonly type = SET_CURRENT_RESOURCE;
  constructor(public payload: Resource) {}
}

export const PUBLISH_RESOURCE = 'PUBLISH RESOURCE';
export const PUBLISH_RESOURCE_SUCCESS = 'PUBLISH RESOURCE SUCCESS';
export const PUBLISH_RESOURCE_FAIL = 'PUBLISH RESOURCE FAIL';

export class PublishResource implements Action {
  readonly type = PUBLISH_RESOURCE;
  constructor(public payload: string) {}
}

export class PublishResourceSuccess implements Action {
  readonly type = PUBLISH_RESOURCE_SUCCESS;
  constructor() {}
}

export class PublishResourceFail implements Action {
  readonly type = PUBLISH_RESOURCE_FAIL;
  constructor(public payload: string) {}
}

export const UNPUBLISH_RESOURCE = 'UNPUBLISH RESOURCE';
export const UNPUBLISH_RESOURCE_SUCCESS = 'UNPUBLISH RESOURCE SUCCESS';
export const UNPUBLISH_RESOURCE_FAIL = 'UNPUBLISH RESOURCE FAIL';

export class UnpublishResource implements Action {
  readonly type = UNPUBLISH_RESOURCE;
  constructor(public payload: string) {}
}

export class UnpublishResourceSuccess implements Action {
  readonly type = UNPUBLISH_RESOURCE_SUCCESS;
  constructor() {}
}

export class UnpublishResourceFail implements Action {
  readonly type = UNPUBLISH_RESOURCE_FAIL;
  constructor(public payload: string) {}
}

export type Actions =
  | LoadResources
  | LoadResourcesSuccess
  | LoadResourcesFail
  | LoadResource
  | LoadResourceSuccess
  | LoadResourceFail
  | CreateResource
  | CreateResourceSuccess
  | CreateResourceFail
  | UpdateResource
  | UpdateResourceSuccess
  | UpdateResourceFail
  | DeleteResource
  | DeleteResourceSuccess
  | DeleteResourceFail
  | SetCurrentResource
  | PublishResource
  | PublishResourceSuccess
  | PublishResourceFail
  | UnpublishResource
  | UnpublishResourceSuccess
  | UnpublishResourceFail;

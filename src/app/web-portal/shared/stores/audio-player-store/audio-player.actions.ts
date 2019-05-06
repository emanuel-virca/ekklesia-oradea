import { Action } from '@ngrx/store';

import { AudioResource } from '@web-portal/shared/models/audio-resource.model';

export enum AudioPlayerActionTypes {
  Select = '[Audio Player] Select',
  ChangeStatus = '[Audio Player] Change Status',
  Clear = '[Audio Player] Clear',
}

export class Select implements Action {
  readonly type = AudioPlayerActionTypes.Select;

  constructor(public payload: AudioResource) {}
}

export class Clear implements Action {
  readonly type = AudioPlayerActionTypes.Clear;

  constructor() {}
}

export class ChangeStatus implements Action {
  readonly type = AudioPlayerActionTypes.ChangeStatus;

  constructor(public payload: string) {}
}

export type AudioPlayerActions = Select | Clear | ChangeStatus;

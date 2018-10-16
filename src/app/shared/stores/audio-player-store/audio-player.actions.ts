import { Action } from '@ngrx/store';
import { AudioResource } from '../../models/audio-resource.model';

export enum AudioPlayerActionTypes {
    Select = '[Audio Player] Select',
    ChangeStatus = '[Audio Player] Change Status',
}

export class Select implements Action {
    readonly type = AudioPlayerActionTypes.Select;

    constructor(public payload: AudioResource) { }
}

export class ChangeStatus implements Action {
    readonly type = AudioPlayerActionTypes.ChangeStatus;

    constructor(public payload: string) { }
}

export type AudioPlayerActions = Select | ChangeStatus;

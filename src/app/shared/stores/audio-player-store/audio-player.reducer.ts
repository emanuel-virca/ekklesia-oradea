import { AudioPlayerActions, AudioPlayerActionTypes } from './audio-player.actions';
import { AudioResource } from '../../models/audio-resource.model';

const initialState: AudioPlayerState = {
    current: null,
    status: '',
};

export interface AudioPlayerState {
    current: AudioResource;
    status: string;
}

export function reducer(state = initialState, action: AudioPlayerActions): AudioPlayerState {
    switch (action.type) {
        case AudioPlayerActionTypes.Select:
            return { ...state, current: action.payload, status: 'playing' };
        case AudioPlayerActionTypes.ChangeStatus:
            return { ...state, status: action.payload };
        default:
            return state;
    }
}

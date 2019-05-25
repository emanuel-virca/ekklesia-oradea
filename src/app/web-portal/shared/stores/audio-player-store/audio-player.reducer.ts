import { AudioPlayerActions, AudioPlayerActionTypes } from './audio-player.actions';
import { AudioResource } from '@web-portal/shared/models/audio-resource.model';

const initialState: State = {
  current: null,
  status: '',
};

export interface State {
  current: AudioResource;
  status: string;
}

export function audioPlayerReducer(state = initialState, action: AudioPlayerActions): State {
  switch (action.type) {
    case AudioPlayerActionTypes.Select:
      return { ...state, current: action.payload, status: 'playing' };
    case AudioPlayerActionTypes.Clear:
      return { ...state, current: null, status: '' };
    case AudioPlayerActionTypes.ChangeStatus:
      return { ...state, status: action.payload };
    default:
      return state;
  }
}

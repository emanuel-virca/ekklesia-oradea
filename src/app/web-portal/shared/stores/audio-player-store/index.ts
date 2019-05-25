import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '@root-state';
import * as fromAudioPlayer from './audio-player.reducer';

export interface State extends fromRoot.State {
  audioPlayer: fromAudioPlayer.State;
}

export const getAudioPlayerState = createFeatureSelector<fromAudioPlayer.State>('audioPlayer');

export const getCurrentAudioResource = createSelector(
  getAudioPlayerState,
  state => state.current
);

export const getAudioStatus = createSelector(
  getAudioPlayerState,
  state => state.status
);

export const getIsAudioPlayerVisible = createSelector(
  getAudioPlayerState,
  state => state.current != null
);

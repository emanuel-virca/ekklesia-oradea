import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '@root-state/app.state';
import * as fromAudioPlayer from './audio-player.reducer';

export interface AppState extends fromRoot.AppState {
  audioPlayer: fromAudioPlayer.AudioPlayerState;
}

export const getAudioPlayerState = createFeatureSelector<fromAudioPlayer.AudioPlayerState>('audioPlayer');

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

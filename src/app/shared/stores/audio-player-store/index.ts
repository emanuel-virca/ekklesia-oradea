import * as fromRoot from '../../../state/app.state';
import * as fromAudioPlayer from './audio-player.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

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

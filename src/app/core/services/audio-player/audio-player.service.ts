import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs';

import { AudioPlayerState } from '../../models/audio-player-state';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {
  audioPlayerSubject = new Subject<AudioPlayerState>();
  audioPlayerActionsSubject = new Subject<string>();

  currentAudioId: string = null;

  constructor(@Optional() @SkipSelf() prior: AudioPlayerService) {
    if (prior) { return prior; }
  }

  play(audioId: string) {
    this.currentAudioId = audioId;
    this.audioPlayerActionsSubject.next('play');
  }

  pause() {
    this.audioPlayerActionsSubject.next('pause');
  }

  playing() {
    this.audioPlayerSubject.next(<AudioPlayerState>{ state: 'playing', audioId: this.currentAudioId });
  }

  paused() {
    this.audioPlayerSubject.next(<AudioPlayerState>{ state: 'paused', audioId: this.currentAudioId });
  }

  ended() {
    this.audioPlayerSubject.next(<AudioPlayerState>{ state: 'ended', audioId: this.currentAudioId });
  }
}

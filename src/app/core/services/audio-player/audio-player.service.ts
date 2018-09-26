import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs';

import { AudioPlayerState } from '../../models/audio-player-state';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {
  private audioPlayerSubject = new Subject<AudioPlayerState>();

  audioPlayerState = this.audioPlayerSubject.asObservable();

  constructor(@Optional() @SkipSelf() prior: AudioPlayerService) {
    if (prior) { return prior; }
  }

  play(id) {
    this.audioPlayerSubject.next(<AudioPlayerState>{ resourceId: id });
  }

  hide() {
    this.audioPlayerSubject.next(<AudioPlayerState>{ resourceId: null });
  }
}

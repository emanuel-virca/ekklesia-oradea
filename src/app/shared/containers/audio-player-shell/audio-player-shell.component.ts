import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromAudioPlayer from '../../stores/audio-player-store';
import * as fromAudioPlayerActions from '../../stores/audio-player-store/audio-player.actions';

import { AudioResource } from '../../models/audio-resource.model';
import { Observable } from 'rxjs';
import { AudioPlayerComponent } from '../../components/audio-player/audio-player.component';

@Component({
  selector: 'app-audio-player-shell',
  templateUrl: './audio-player-shell.component.html'
})
export class AudioPlayerShellComponent implements OnInit {
  audioResource$: Observable<AudioResource>;

  @ViewChild(AudioPlayerComponent) audioPlayer: AudioPlayerComponent;

  constructor(
    private store: Store<fromAudioPlayer.AppState>,
  ) { }

  ngOnInit(): void {
    this.audioResource$ = this.store.pipe(select(fromAudioPlayer.getCurrentAudioResource));
    this.store.pipe(select(fromAudioPlayer.getAudioStatus)).subscribe((x) => this.onStoreStatusChanged(x));
  }

  public onStatusChanged(event: string): void {
    this.store.dispatch(new fromAudioPlayerActions.ChangeStatus(event));
  }

  private onStoreStatusChanged(status) {
    if (!this.audioPlayer) { return; }

    switch (status) {
      case 'paused':
        this.audioPlayer.pause();
        break;
      case 'playing':
        this.audioPlayer.play();
        break;
    }
  }
}

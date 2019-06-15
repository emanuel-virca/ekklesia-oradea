import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AudioResource } from '@web-portal/shared/models/audio-resource.model';
import { AudioPlayerComponent } from '@web-portal/shared/components/audio-player/audio-player.component';

import * as fromAudioPlayer from '@web-portal/shared/stores/audio-player-store';
import * as fromAudioPlayerActions from '@web-portal/shared/stores/audio-player-store/audio-player.actions';

@Component({
  selector: 'app-audio-player-shell',
  templateUrl: './audio-player-shell.component.html',
})
export class AudioPlayerShellComponent implements OnInit {
  audioResource$: Observable<AudioResource>;

  @ViewChild(AudioPlayerComponent, { static: false }) audioPlayer: AudioPlayerComponent;

  constructor(private store: Store<fromAudioPlayer.State>) {}

  ngOnInit(): void {
    this.audioResource$ = this.store.pipe(select(fromAudioPlayer.getCurrentAudioResource));
    this.store.pipe(select(fromAudioPlayer.getAudioStatus)).subscribe(x => this.onStoreStatusChanged(x));
  }

  public onStatusChanged(event: string): void {
    this.store.dispatch(new fromAudioPlayerActions.ChangeStatus(event));
  }

  public close(): void {
    this.store.dispatch(new fromAudioPlayerActions.Clear());
  }

  private onStoreStatusChanged(status) {
    if (!this.audioPlayer) {
      return;
    }

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

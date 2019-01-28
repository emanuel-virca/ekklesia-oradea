import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { AudioResource } from '../../models/audio-resource.model';
import * as fromAudioPlayer from 'src/app/shared/stores/audio-player-store';
import * as audioPlayerActions from 'src/app/shared/stores/audio-player-store/audio-player.actions';


@Component({
  selector: 'app-audio-play-button-shell',
  templateUrl: './audio-play-button-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudioPlayButtonShellComponent implements OnInit {
  @Input() audioResource: AudioResource;
  playing$: Observable<boolean>;

  constructor(
    private store: Store<fromAudioPlayer.AppState>
  ) { }

  ngOnInit() {
    this.playing$ = this.store.pipe(
      select(fromAudioPlayer.getAudioPlayerState),
      map((state) => state.current && state.current.id === this.audioResource.id && state.status === 'playing')
    );
  }

  public play() {
    this.store.dispatch(new audioPlayerActions.Select(this.audioResource));
  }

  public pause() {
    this.store.dispatch(new audioPlayerActions.ChangeStatus('paused'));
  }
}

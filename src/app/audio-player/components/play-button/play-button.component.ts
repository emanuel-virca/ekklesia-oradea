import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { map, withLatestFrom, first } from 'rxjs/operators';

import { AudioResource } from 'app/audio-player/models/audio-resource';
import { AudioPlayerService } from 'app/audio-player/services/audio-player.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'audio-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioPlayButtonComponent {
  @Input() audioResource: AudioResource;

  loading$ = this.audioPlayerService.trackInfo.loading.pipe(
    withLatestFrom(this.audioPlayerService.trackInfo.audioResource),
    map(([loading, audioResource]) => (this.isCurrentResource(audioResource) ? loading : false))
  );

  playing$ = this.audioPlayerService.trackInfo.playing.pipe(
    withLatestFrom(this.audioPlayerService.trackInfo.audioResource),
    map(([playing, audioResource]) => (this.isCurrentResource(audioResource) ? playing : false))
  );

  constructor(private audioPlayerService: AudioPlayerService) {}

  public async onPlay() {
    const currentAudioResource = await this.audioPlayerService.trackInfo.audioResource.pipe(first()).toPromise();

    if (this.isCurrentResource(currentAudioResource)) {
      this.audioPlayerService.play();
    } else {
      this.audioPlayerService.set(this.audioResource);
    }
  }

  public onPause() {
    this.audioPlayerService.pause();
  }

  isCurrentResource(audioResource): boolean {
    return this.audioResource && audioResource && this.audioResource.id === audioResource.id;
  }
}

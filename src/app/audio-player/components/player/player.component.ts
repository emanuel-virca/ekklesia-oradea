import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AudioPlayerService } from 'app/audio-player/services/audio-player.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'audio-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioPlayerComponent {
  trackInfo = this.audioPlayerService.trackInfo;

  constructor(private audioPlayerService: AudioPlayerService) {}
}

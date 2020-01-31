import { Component, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';

import { AudioPlayerService } from 'app/audio-player/services/audio-player.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'audio-waveform',
  templateUrl: './waveform.component.html',
  styleUrls: ['./waveform.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioWaveformComponent {
  progress = this.audioPlayerService.trackInfo.progress;

  @ViewChild('progressbar', { static: true }) progressbar: ElementRef;

  constructor(private audioPlayerService: AudioPlayerService) {}

  public onSeek(event) {
    const percent = event.offsetX / this.progressbar.nativeElement.offsetWidth;
    this.audioPlayerService.seek(percent);
  }
}

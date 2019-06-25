import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-audio-play-button',
  templateUrl: './audio-play-button.component.html',
  styleUrls: ['./audio-play-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioPlayButtonComponent {
  @Input() disabled: boolean;
  @Input() playing: boolean;

  @Output() playAudio = new EventEmitter();
  @Output() pauseAudio = new EventEmitter();

  public togglePlay() {
    if (!this.playing) {
      this.playAudio.emit();
    } else {
      this.pauseAudio.emit();
    }
  }
}

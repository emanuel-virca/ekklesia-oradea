import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { setup } from 'plyr';
import { filter, take } from 'rxjs/operators';
import Hls from 'hls.js';

import { AudioPlayerService } from 'app/audio-player/services/audio-player.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'audio-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioPlayerComponent implements AfterViewInit {
  @Output() showDetails = new EventEmitter<string>();

  @ViewChild('player') player: ElementRef;
  @ViewChild('playerControls') playerControls: ElementRef<HTMLAudioElement>;

  trackInfo = this.audioPlayerService.trackInfo;

  constructor(private audioPlayerService: AudioPlayerService) {}

  ngAfterViewInit(): void {
    this.trackInfo.audioResource
      .pipe(
        filter(x => !!x),
        take(1)
      )
      .subscribe(x => {
        setTimeout(() => {
          setup('#player', { controls: this.playerControls.nativeElement });
        }, 100);
      });

    //https://github.com/sampotts/plyr/blob/master/CONTROLS.md
    this.trackInfo.audioResource.pipe(filter(x => !!x)).subscribe(x => {
      setTimeout(() => {
        if (Hls.isSupported() && !x.streamUrl.includes('hearthis')) {
          var hls = new Hls();
          hls.loadSource(x.streamUrl);
          hls.attachMedia(this.player.nativeElement);
          this.player.nativeElement.play();
        } else {
          this.player.nativeElement.src = x.streamUrl;
          this.player.nativeElement.play();
        }
      }, 100);
    });
  }

  onShowDetails(resourceId: string) {
    this.showDetails.emit(resourceId);
  }
}

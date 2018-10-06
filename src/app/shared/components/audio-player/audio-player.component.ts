import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef, OnDestroy } from '@angular/core';

import { interval, Subscription, BehaviorSubject } from 'rxjs';
import { AudioResource } from '../../models/audio-resource.model';
import { AudioPlayerService } from '../../../core/services/audio-player/audio-player.service';
import { AudioPlayerState } from '../../../core/models/audio-player-state';


@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit, OnChanges, OnDestroy {
  audioStatus: string;
  trackProgress = 0;
  trackSchedulerSubscriber: Subscription;
  audioElement: HTMLAudioElement;
  audioPlayerSubject: BehaviorSubject<AudioPlayerState>;

  @ViewChild('progressbar') progressbar: ElementRef;

  @Input() audioResource: AudioResource;

  constructor(private audioPlayerService: AudioPlayerService) {
    this.audioPlayerSubject = this.audioPlayerService.audioPlayerSubject;
    this.audioElement = this.audioPlayerService.audioElement;
  }

  ngOnInit() {
    this.audioPlayerService.audioPlayerSubject.subscribe((x: AudioPlayerState) => {
      this.audioStatus = x.state;
    });

    this.trackSchedulerSubscriber = interval(1000).subscribe(() => this.onProgress());
  }

  public play(): void {
    this.audioPlayerService.play(this.audioResource);
  }

  public pause(): void {
    this.audioPlayerService.pause();
  }

  public seek(event): void {
    const percent = event.offsetX / this.progressbar.nativeElement.offsetWidth;
    this.audioPlayerService.seek(percent);
    this.onProgress();
  }

  private onProgress(): void {
    this.trackProgress = (100 / this.audioElement.duration) * this.audioElement.currentTime;
  }

  ngOnChanges(): void {
    this.trackProgress = 0;
    this.audioPlayerService.play(this.audioResource);
  }

  ngOnDestroy(): void {
    this.trackSchedulerSubscriber.unsubscribe();
  }
}

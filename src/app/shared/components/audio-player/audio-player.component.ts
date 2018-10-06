import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';

import { takeWhile } from 'rxjs/operators';
import { interval, Subscription } from 'rxjs';
import { AudioResource } from '../../models/audio-resource.model';
import { AudioPlayerService } from '../../../core/services/audio-player/audio-player.service';


@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit, OnChanges {
  playerState: string;
  trackProgress = 0;
  trackSchedulerSubscriber: Subscription;
  audioElement: HTMLAudioElement;
  audioPlayerStateSubscription: Subscription;

  @ViewChild('progressbar') progressbar: ElementRef;

  @Input() audioResource: AudioResource;

  constructor(private audioPlayerService: AudioPlayerService) {
    this.createAudio();
  }

  ngOnInit() {
    this.audioPlayerStateSubscription = this.audioPlayerService.audioPlayerActionsSubject.subscribe({ next: (action: string) => {
      switch (action) {
        case 'play': this.play(); break;
        case 'pause': this.pause(); break;
        default: break;
      }
    }});
  }

  public play(): void {
    this.audioElement.play();
  }

  public pause(): void {
    this.audioElement.pause();
  }

  public seek(event): void {
    const percent = event.offsetX / this.progressbar.nativeElement.offsetWidth;
    this.audioElement.currentTime = percent * this.audioElement.duration;
    this.onProgress();
  }

  private createAudio(): void {
    this.audioElement = new Audio();
    this.audioElement.autoplay = true;

    this.registerBindings();
  }

  private registerBindings(): void {
    if (!this.audioElement) { return; }

    this.audioElement.addEventListener('ended', () => this.onEnded());
    this.audioElement.addEventListener('playing', () => this.onPlaying());
    this.audioElement.addEventListener('pause', () => this.onPaused());
  }

  private onPlaying(): void {
    this.playerState = 'playing';
    this.trackSchedulerSubscriber = interval(1000)
      .pipe(takeWhile(() => this.playerState === 'playing'))
      .subscribe(() => this.onProgress());
    this.audioPlayerService.playing();
  }

  public onPaused(): void {
    this.playerState = 'paused';
    this.trackSchedulerSubscriber.unsubscribe();
    this.audioPlayerService.paused();
  }

  private onProgress(): void {
    this.trackProgress = (100 / this.audioElement.duration) * this.audioElement.currentTime;
  }

  private onEnded(): void {
    this.playerState = 'ended';
    this.reset();
    this.audioPlayerService.ended();
  }

  private reset() {
    this.audioElement.currentTime = 0;
    this.onProgress();
  }

  ngOnChanges(): void {
    this.reset();
    this.audioElement.src = this.audioResource.streamUrl;
  }
}

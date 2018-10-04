import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';

import { takeWhile } from 'rxjs/operators';
import { interval, Subscription } from 'rxjs';
import { AudioResource } from '../../models/audio-resource.model';


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

  @ViewChild('progressbar') progressbar: ElementRef;

  @Input() audioResource: AudioResource;

  constructor() {
    this.createAudio();
  }

  ngOnInit() {
  }

  public play(): void {
    this.audioElement.play();
  }

  public pause(): void {
    this.playerState = 'paused';
    this.audioElement.pause();
    this.trackSchedulerSubscriber.unsubscribe();
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
  }

  private onPlaying(): void {
    this.playerState = 'playing';
    this.trackSchedulerSubscriber = interval(1000)
      .pipe(takeWhile(() => this.playerState === 'playing'))
      .subscribe(() => this.onProgress());
  }

  private onProgress(): void {
    this.trackProgress = (100 / this.audioElement.duration) * this.audioElement.currentTime;
  }

  private onEnded(): void {
    this.playerState = 'ended';
    this.audioElement.currentTime = 0;
    this.onProgress();
  }

  ngOnChanges(): void {
    this.audioElement.src = this.audioResource.streamUrl;
  }
}

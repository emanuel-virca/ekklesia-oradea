import {
  Component,
  OnInit,
  Input,
  OnChanges,
  ViewChild,
  ElementRef,
  OnDestroy,
  EventEmitter,
  Output,
  SimpleChanges,
} from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { AudioResource } from '@web-portal/shared/models/audio-resource.model';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
})
export class AudioPlayerComponent implements OnInit, OnChanges, OnDestroy {
  trackProgress = 0;
  trackSchedulerSubscriber: Subscription;
  audioElement: HTMLAudioElement;
  audioStatus: string;

  @ViewChild('progressbar') progressbar: ElementRef;

  @Input() audioResource: AudioResource;
  @Output() statusChanged = new EventEmitter<string>();

  constructor() {
    this.createAudio();
  }

  ngOnInit() {
    this.trackSchedulerSubscriber = interval(1000).subscribe(() => this.onProgress());
  }

  private createAudio(): void {
    this.audioElement = new Audio();
    this.audioElement.autoplay = true;

    this.registerBindings();
  }

  private registerBindings(): void {
    if (!this.audioElement) {
      return;
    }

    this.audioElement.addEventListener('ended', () => this.onEnded());
    this.audioElement.addEventListener('playing', () => this.onStatusChanged('playing'));
    this.audioElement.addEventListener('pause', () => this.onStatusChanged('paused'));
    this.audioElement.addEventListener('seeking', () => this.onStatusChanged('loading'));
    this.audioElement.addEventListener('seeked', () => this.onStatusChanged('seeked'));
    this.audioElement.addEventListener('waiting', () => this.onStatusChanged('loading'));
  }

  public play(): void {
    if (this.audioResource == null) {
      return this.reset();
    }

    this.audioElement.play();
  }

  public pause() {
    if (this.audioResource == null) {
      return this.reset();
    }

    this.audioElement.pause();
  }

  public seek(event): void {
    if (this.audioResource == null) {
      return this.reset();
    }

    const percent = event.offsetX / this.progressbar.nativeElement.offsetWidth;
    this.audioElement.currentTime = percent * this.audioElement.duration;
    this.onProgress();
  }

  private reset() {
    this.audioElement.pause();
    this.audioElement.src = null;
  }

  private onProgress(): void {
    this.trackProgress = (100 / this.audioElement.duration) * this.audioElement.currentTime;
  }

  private onEnded(): void {
    this.audioElement.currentTime = 0;
    this.onStatusChanged('ended');
  }

  private onStatusChanged(status: string) {
    this.audioStatus = status;
    this.statusChanged.emit(this.audioStatus);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.audioResource.firstChange ||
      (changes.audioResource.currentValue &&
        changes.audioResource.previousValue &&
        changes.audioResource.currentValue.id !== changes.audioResource.previousValue.id)
    ) {
      this.trackProgress = 0;
      this.audioElement.src = this.audioResource.streamUrl;
    }

    this.audioElement.play();
  }

  ngOnDestroy(): void {
    this.trackSchedulerSubscriber.unsubscribe();
  }
}

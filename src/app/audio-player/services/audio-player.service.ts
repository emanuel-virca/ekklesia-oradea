import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, interval, BehaviorSubject, NEVER } from 'rxjs';

import { AudioResource } from '../models/audio-resource';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AudioPlayerService implements OnDestroy {
  trackInfo = {
    audioResource: new BehaviorSubject<AudioResource>(null),
    progress: new BehaviorSubject<number>(0),
    status: new BehaviorSubject<string>(null),
    duration: new BehaviorSubject<number>(null),
    currentTime: new BehaviorSubject<number>(0),
    playing: new BehaviorSubject<boolean>(null),
    loading: new BehaviorSubject<boolean>(false),
  };

  private audioElement: HTMLAudioElement;
  private progressSubscription: Subscription;

  constructor() {}

  public set(audioResource: AudioResource) {
    if (!audioResource) {
      return;
    }

    if (!this.audioElement) {
      this.createAudio();
    }

    this.trackInfo.audioResource.next(audioResource);
    this.trackInfo.progress.next(0);
    this.audioElement.src = audioResource.streamUrl;
    this.audioElement.play();
  }

  public clean() {
    this.trackInfo.audioResource.next(null);
    this.trackInfo.progress.next(0);
    this.trackInfo.status.next(null);
    this.trackInfo.currentTime.next(0);
    this.trackInfo.duration.next(0);

    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.src = null;
    }
  }

  public play(): void {
    this.audioElement.play();
  }

  public pause() {
    this.audioElement.pause();
  }

  public seek(percent: number): void {
    this.audioElement.currentTime = percent * this.audioElement.duration;

    this.computeProgress();
  }

  private createAudio(): void {
    if (typeof Audio === 'undefined') {
      return;
    }

    this.audioElement = new Audio();
    this.audioElement.autoplay = true;

    this.registerBindings();
  }

  private computeProgress(): void {
    this.trackInfo.progress.next((100 / this.audioElement.duration) * this.audioElement.currentTime);
  }

  private registerBindings(): void {
    if (!this.audioElement) {
      return;
    }

    const progressObservable = this.trackInfo.playing.pipe(switchMap(playing => (playing ? interval(1000) : NEVER)));
    this.progressSubscription = progressObservable.subscribe(() => {
      this.computeProgress();
    });

    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
    this.audioElement.addEventListener('audioprocess', event => {
      this.onStatusChanged(event);
    });

    this.audioElement.addEventListener('canplaythrough', event => {
      this.onStatusChanged(event);
    });

    this.audioElement.addEventListener('complete', event => {
      this.onStatusChanged(event);
    });

    this.audioElement.addEventListener('durationchange', event => {
      this.trackInfo.duration.next(this.audioElement.duration);
      this.onStatusChanged(event);
    });

    this.audioElement.addEventListener('emptied', event => {
      this.onStatusChanged(event);
      this.trackInfo.playing.next(false);
    });

    this.audioElement.addEventListener('ended', event => {
      this.onStatusChanged(event);
      this.audioElement.currentTime = 0;
      this.trackInfo.playing.next(false);
    });

    this.audioElement.addEventListener('loadeddata', event => {
      this.onStatusChanged(event);
      this.trackInfo.loading.next(false);
    });

    this.audioElement.addEventListener('loadedmetadata', event => {
      this.onStatusChanged(event);
    });

    this.audioElement.addEventListener('pause', event => {
      this.onStatusChanged(event);
      this.trackInfo.playing.next(false);
    });

    this.audioElement.addEventListener('play', event => {
      this.onStatusChanged(event);
      this.trackInfo.playing.next(true);
    });

    this.audioElement.addEventListener('playing', event => {
      this.onStatusChanged(event);
      this.trackInfo.playing.next(true);
    });

    this.audioElement.addEventListener('ratechange', event => {
      this.onStatusChanged(event);
    });

    this.audioElement.addEventListener('seeked', event => {
      this.onStatusChanged(event);
      this.trackInfo.loading.next(false);
    });

    this.audioElement.addEventListener('seeking', event => {
      this.onStatusChanged(event);
      this.trackInfo.loading.next(true);
    });

    this.audioElement.addEventListener('stalled', event => {
      this.onStatusChanged(event);
    });

    this.audioElement.addEventListener('suspend', event => {
      this.onStatusChanged(event);
    });

    this.audioElement.addEventListener('timeupdate', event => {
      this.onStatusChanged(event);
      this.trackInfo.currentTime.next(this.audioElement.currentTime);
    });

    this.audioElement.addEventListener('volumechange', event => {
      this.onStatusChanged(event);
    });

    this.audioElement.addEventListener('waiting', event => {
      this.onStatusChanged(event);
      this.trackInfo.loading.next(true);
    });
  }

  private onStatusChanged(event: any) {
    this.trackInfo.status.next(event.type);
  }

  ngOnDestroy(): void {
    this.progressSubscription.unsubscribe();
  }
}

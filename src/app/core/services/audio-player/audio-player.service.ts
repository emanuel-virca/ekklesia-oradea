import { Injectable, Optional, SkipSelf } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AudioPlayerState } from '../../models/audio-player-state';
import { AudioResource } from '../../../shared/models/audio-resource.model';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {
  audioElement: HTMLAudioElement;

  audioResource: AudioResource = null;
  state: string;

  audioPlayerSubject = new BehaviorSubject<AudioPlayerState>({ audioId: undefined, state: undefined });

  constructor(@Optional() @SkipSelf() prior: AudioPlayerService) {
    if (prior) { return prior; }

    this.createAudio();
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
    this.audioElement.addEventListener('seeking', () => this.onSeeking());
    this.audioElement.addEventListener('seeked', () => this.onSeeked());
    this.audioElement.addEventListener('waiting', () => this.onSeeking());
  }

  private onPlaying(): void {
    this.state = 'playing';
    this.audioPlayerSubject.next({ audioId: this.audioResource.id, state: this.state });
  }

  private onPaused(): void {
    this.state = 'paused';
    this.audioPlayerSubject.next({ audioId: this.audioResource.id, state: this.state });
  }

  private onEnded(): void {
    this.state = 'ended';
    this.audioElement.currentTime = 0;
    this.audioPlayerSubject.next({ audioId: this.audioResource.id, state: this.state });
  }

  private onSeeking(): void {
    this.state = 'seeking';
    this.audioPlayerSubject.next({ audioId: this.audioResource.id, state: this.state });
  }

  private onSeeked(): void {
    this.state = 'seeked';
    this.audioPlayerSubject.next({ audioId: this.audioResource.id, state: this.state });
  }

  public play(audioResource: AudioResource) {
    if (audioResource == null) {
      return this.reset();
    }

    if (this.audioResource && audioResource.id === this.audioResource.id) {
      return this.audioElement.play();
    }

    this.audioResource = audioResource;
    this.audioElement.src = audioResource.streamUrl;
    this.audioElement.play();
  }

  public pause() {
    this.audioElement.pause();
  }

  public seek(percent: number): void {
    this.audioElement.currentTime = percent * this.audioElement.duration;
  }

  private reset() {
    this.audioElement.pause();
    this.audioElement.src = null;
  }
}

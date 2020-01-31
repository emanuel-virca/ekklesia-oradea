import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatMenuModule, MatButtonModule } from '@angular/material';

import { AudioPlayButtonComponent } from './components/play-button/play-button.component';
import { AudioPlayerComponent } from './components/player/player.component';
import { AudioWaveformComponent } from './components/waveform/waveform.component';

import { SecondsToTimePipe } from './pipes/seconds-to-time/seconds-to-time.pipe';
import { AudioPlayerService } from './services/audio-player.service';

@NgModule({
  declarations: [AudioPlayButtonComponent, AudioPlayerComponent, SecondsToTimePipe, AudioWaveformComponent],
  imports: [CommonModule, MatIconModule, MatMenuModule, MatButtonModule],
  exports: [AudioPlayButtonComponent, AudioPlayerComponent],
})
export class AudioPlayerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AudioPlayerModule,
      providers: [AudioPlayerService],
    };
  }
}

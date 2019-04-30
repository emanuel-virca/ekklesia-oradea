import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ContentLoaderModule } from '@netbasal/content-loader';

import { SharedModule as CoreSharedModule } from '@shared/shared.module';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import { AudioPlayerShellComponent } from './containers/audio-player-shell/audio-player-shell.component';
import { AudioPlayButtonComponent } from './components/audio-play-button/audio-play-button.component';
import { AudioPlayButtonShellComponent } from './containers/audio-play-button-shell/audio-play-button-shell.component';
import { audioPlayerReducer } from './stores/audio-player-store/audio-player.reducer';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { ResourcesSearchComponent } from './components/resources-search/resources-search.component';
// tslint:disable-next-line:max-line-length
import { MaterialCardHeaderContentLoaderComponent } from './components/material-card-header-content-loader/material-card-header-content-loader.component';
import { MaterialListContentLoaderComponent } from './components/material-list-content-loader/material-list-content-loader.component';
import { MaterialModule } from './material/material.module';
import { ConvertToAudioResourcePipe } from './pipes/convert-to-audio-resource/convert-to-audio-resource.pipe';
import { SecondsToTimePipe } from './pipes/seconds-to-time/seconds-to-time.pipe';

@NgModule({
  declarations: [
    MainNavComponent,
    BottomNavComponent,
    AudioPlayButtonShellComponent,
    AudioPlayButtonComponent,
    AudioPlayerComponent,
    AudioPlayerShellComponent,
    ResourcesSearchComponent,
    MaterialCardHeaderContentLoaderComponent,
    MaterialListContentLoaderComponent,
    ConvertToAudioResourcePipe,
    SecondsToTimePipe,
  ],
  imports: [
    CoreSharedModule,
    MaterialModule,
    StoreModule.forFeature('audioPlayer', audioPlayerReducer),
    ContentLoaderModule,
  ],
  exports: [
    CoreSharedModule,
    MaterialModule,
    MainNavComponent,
    BottomNavComponent,
    AudioPlayButtonComponent,
    AudioPlayButtonShellComponent,
    AudioPlayerComponent,
    AudioPlayerShellComponent,
    ResourcesSearchComponent,
    MaterialCardHeaderContentLoaderComponent,
    MaterialListContentLoaderComponent,
    ContentLoaderModule,
    SecondsToTimePipe,
    ConvertToAudioResourcePipe,
  ],
})
export class SharedModule {}

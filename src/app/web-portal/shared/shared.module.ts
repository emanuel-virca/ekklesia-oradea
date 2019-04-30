import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

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
  ],
  imports: [CoreSharedModule, MaterialModule, StoreModule.forFeature('audioPlayer', audioPlayerReducer)],
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
  ],
})
export class SharedModule {}

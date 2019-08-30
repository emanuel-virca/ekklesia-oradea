import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ContentLoaderModule } from '@netbasal/content-loader';
import { NgxMasonryModule } from 'ngx-masonry';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SharedModule as CoreSharedModule } from '@shared/shared.module';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import { AudioPlayerShellComponent } from './containers/audio-player-shell/audio-player-shell.component';
import { AudioPlayButtonComponent } from './components/audio-play-button/audio-play-button.component';
import { AudioPlayButtonShellComponent } from './containers/audio-play-button-shell/audio-play-button-shell.component';
import { audioPlayerReducer } from './stores/audio-player-store/audio-player.reducer';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { ResourcesSearchComponent } from './components/resources-search/resources-search.component';

import { MaterialModule } from './material/material.module';
import { ConvertToAudioResourcePipe } from './pipes/convert-to-audio-resource/convert-to-audio-resource.pipe';
import { SecondsToTimePipe } from './pipes/seconds-to-time/seconds-to-time.pipe';

import { ResourceCardComponent } from './components/resource-card/resource-card.component';
import { ResourceTagsComponent } from './components/resource-tags/resource-tags.component';
import { ResourcesMasonryComponent } from './components/resources-masonry/resources-masonry.component';
// TODO are this used?
import {
  MaterialListContentLoaderComponent,
  MatCardAvatarContentLoaderComponent,
  MaterialCardHeaderContentLoaderComponent,
  MatCardSubtitleContentLoaderComponent,
} from './components/content-loaders';

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
    MatCardAvatarContentLoaderComponent,
    MatCardSubtitleContentLoaderComponent,
    ResourceCardComponent,
    ResourceTagsComponent,
    ResourcesMasonryComponent,
  ],
  imports: [
    CoreSharedModule,
    MaterialModule,
    StoreModule.forFeature('audioPlayer', audioPlayerReducer),
    ContentLoaderModule,
    NgxMasonryModule,
  ],
  exports: [
    CoreSharedModule,
    MaterialModule,
    InfiniteScrollModule,
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
    MatCardAvatarContentLoaderComponent,
    MatCardSubtitleContentLoaderComponent,
    ResourceCardComponent,
    ResourceTagsComponent,
    ResourcesMasonryComponent,
  ],
})
export class SharedModule {}

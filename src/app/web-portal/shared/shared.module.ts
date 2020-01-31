import { NgModule } from '@angular/core';
import { NgxMasonryModule } from 'ngx-masonry';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SharedModule as CoreSharedModule } from '@shared/shared.module';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import { ResourcesSearchComponent } from './components/resources-search/resources-search.component';
import { MaterialModule } from './material/material.module';
import { ConvertToAudioResourcePipe } from './pipes/convert-to-audio-resource/convert-to-audio-resource.pipe';

import { ResourceCardComponent } from './components/resource-card/resource-card.component';
import { ResourcesMasonryComponent } from './components/resources-masonry/resources-masonry.component';

import { LikeButtonShellComponent } from './containers/like-button-shell/like-button-shell.component';
import { AudioPlayerModule } from 'app/audio-player/audio-player.module';

@NgModule({
  declarations: [
    MainNavComponent,
    BottomNavComponent,
    ResourcesSearchComponent,
    ConvertToAudioResourcePipe,
    ResourceCardComponent,
    ResourcesMasonryComponent,
    LikeButtonShellComponent,
  ],
  imports: [CoreSharedModule, MaterialModule, NgxMasonryModule, AudioPlayerModule],
  exports: [
    CoreSharedModule,
    MaterialModule,
    InfiniteScrollModule,
    MainNavComponent,
    BottomNavComponent,
    ResourcesSearchComponent,
    ConvertToAudioResourcePipe,
    ResourceCardComponent,
    ResourcesMasonryComponent,
    LikeButtonShellComponent,
    AudioPlayerModule,
  ],
})
export class SharedModule {}

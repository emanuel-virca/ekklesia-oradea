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
import { ResourcesHorizontalComponent } from './components/resources-horizontal/resources-horizontal.component';
import { ResourceSliderCardComponent } from './components/resource-slider-card/resource-slider-card.component';
import { MessagingRequestPermissionComponent } from './containers/messaging-request-permission/messaging-request-permission.component';
import { ResourceIconPipe } from './pipes/resource-icon.pipe';

@NgModule({
  declarations: [
    MainNavComponent,
    BottomNavComponent,
    ResourcesSearchComponent,
    ConvertToAudioResourcePipe,
    ResourceCardComponent,
    ResourcesMasonryComponent,
    LikeButtonShellComponent,
    ResourcesHorizontalComponent,
    ResourceSliderCardComponent,
    MessagingRequestPermissionComponent,
    ResourceIconPipe,
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
    ResourcesHorizontalComponent,
    LikeButtonShellComponent,
    AudioPlayerModule,
    MessagingRequestPermissionComponent,
    ResourceIconPipe,
  ],
})
export class SharedModule {}

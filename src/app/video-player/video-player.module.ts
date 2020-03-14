import { NgModule } from '@angular/core';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { VideoPlayerComponent } from './video-player/video-player.component';

@NgModule({
  declarations: [VideoPlayerComponent],
  imports: [YouTubePlayerModule],
  exports: [VideoPlayerComponent],
})
export class VideoPlayerModule {}

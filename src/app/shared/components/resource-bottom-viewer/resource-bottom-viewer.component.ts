import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AudioPlayerService } from 'src/app/core/services/audio-player/audio-player.service';
import { AudioPlayerState } from 'src/app/core/models/audio-player-state';
import { Resource } from 'src/app/shared/models/resource.model';
import { ResourceService } from 'src/app/shared/services/resource/resource.service';
import { AudioResource } from 'src/app/shared/models/audio-resource.model';


@Component({
  selector: 'app-resource-bottom-viewer',
  templateUrl: './resource-bottom-viewer.component.html',
  styleUrls: ['./resource-bottom-viewer.component.css']
})
export class ResourceBottomViewerComponent implements OnInit, OnDestroy {
  audioResource: AudioResource;

  private audioPlayerStateChanged: Subscription;

  constructor(
    private audioPlayerService: AudioPlayerService,
    private resourceService: ResourceService
    ) { }

  ngOnInit() {
    this.audioPlayerStateChanged = this.audioPlayerService.audioPlayerState.subscribe((state: AudioPlayerState) => this.getResource(state.resourceId));
  }

  ngOnDestroy() {
    this.audioPlayerStateChanged.unsubscribe();
  }

  private getResource(resourceId) {
    if (resourceId == null) { return; }

    this.resourceService.get(resourceId).subscribe((resource: Resource) => this.audioResource = {
      title: resource.title,
      artwork: resource.imageSrc,
      downloadUrl: resource.downloadUrl,
      streamUrl: resource.streamUrl
    });
  }

}

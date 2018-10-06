import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Resource, ResourceType } from 'src/app/shared/models/resource.model';
import { ResourceService } from 'src/app/shared/services/resource/resource.service';
import { AudioResource } from 'src/app/shared/models/audio-resource.model';
import { ResourceViewerService } from '../../../core/services/resource-viewer/resource-viewer.service';
import { ResourceViewerState } from '../../../core/models/resource-viewer-state';
import { AudioPlayerService } from '../../../core/services/audio-player/audio-player.service';


@Component({
  selector: 'app-resource-bottom-viewer',
  templateUrl: './resource-bottom-viewer.component.html',
  styleUrls: ['./resource-bottom-viewer.component.css']
})
export class ResourceBottomViewerComponent implements OnInit, OnDestroy {
  audioResource: AudioResource;

  private resourceViewerStateSubscription: Subscription;

  constructor(
    private resourceViewerService: ResourceViewerService,
    private audioPlayerService: AudioPlayerService,
    private resourceService: ResourceService,
  ) { }

  ngOnInit() {
    this.resourceViewerStateSubscription = this.resourceViewerService.resourceViewerState
      .subscribe((state: ResourceViewerState) => this.getResource(state.resourceId));
  }

  ngOnDestroy() {
    this.resourceViewerStateSubscription.unsubscribe();
  }

  private getResource(resourceId) {
    if (resourceId == null) { return; }

    if (this.audioResource && resourceId === this.audioResource.id) {
      this.audioPlayerService.play(this.audioResource.id);
      return;
    }

    this.resourceService.get(resourceId).subscribe((resource: Resource) => this.playAudioResource(resource));
  }

  private playAudioResource(resource: Resource) {
    this.audioResource = {
      id: resource.id,
      title: resource.title,
      artwork: resource.imageSrc,
      downloadUrl: resource.downloadUrl,
      streamUrl: resource.streamUrl
    };

    this.audioPlayerService.play(this.audioResource.id);
  }

}

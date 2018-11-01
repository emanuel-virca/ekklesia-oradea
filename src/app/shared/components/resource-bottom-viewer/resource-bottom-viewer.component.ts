import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Resource } from 'src/app/shared/models/resource.model';
import { ResourceService } from 'src/app/shared/services/resource/resource.service';
import { AudioResource } from 'src/app/shared/models/audio-resource.model';
import { ResourceViewerService } from '../../../core/services/resource-viewer/resource-viewer.service';
import { ResourceViewerState } from '../../../core/models/resource-viewer-state';


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

    this.resourceService.get(resourceId);
  }
}

import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs';

import { ResourceViewerState } from '../../models/resource-viewer-state';

@Injectable({
  providedIn: 'root'
})
export class ResourceViewerService {
  private resourceSubject = new Subject<ResourceViewerState>();

  resourceViewerState = this.resourceSubject.asObservable();

  constructor(@Optional() @SkipSelf() prior: ResourceViewerService) {
    if (prior) { return prior; }
  }

  show(id, position) {
    this.resourceSubject.next(<ResourceViewerState>{ resourceId: id, position: position });
  }

  hide() {
    this.resourceSubject.next(<ResourceViewerState>{ resourceId: null });
  }
}

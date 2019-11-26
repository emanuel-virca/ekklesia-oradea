import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { map } from 'rxjs/operators';

import { Resource, ResourceSnippet } from '@shared/models/resource';
import { CollectionsFacade } from '@web-portal/collections/facades/collections.facade';
import { likesLibraryId } from '@shared/models/library';

@Component({
  selector: 'app-like-button-shell',
  templateUrl: './like-button-shell.component.html',
  styleUrls: ['./like-button-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LikeButtonShellComponent {
  @Input() resource: ResourceSnippet | Resource;

  isLiked$ = this.collectionsFacade.query.likedResources.entityIds$.pipe(
    map(resourceIds => this.resource != null && resourceIds != null && resourceIds.includes(this.resource.id))
  );

  constructor(private collectionsFacade: CollectionsFacade) {}

  onSaveToLibrary() {
    this.collectionsFacade.addToLibrary(this.resource, likesLibraryId);
  }

  onRemoveFromLibrary() {
    this.collectionsFacade.removeFromLibrary(this.resource, likesLibraryId);
  }
}

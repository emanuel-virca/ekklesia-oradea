import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { map, take } from 'rxjs/operators';

import { Resource, ResourceSnippet } from '@shared/models/resource';
import { CollectionsFacade } from '@web-portal/collections/facades/collections.facade';
import { likesLibraryId } from '@shared/models/library';
import { AuthenticationService } from '@authentication/services/authentication.service';

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

  constructor(private collectionsFacade: CollectionsFacade, private authenticationService: AuthenticationService) {}

  async onSaveToLibrary() {
    const identity = await this.authenticationService.identity$.pipe(take(1)).toPromise();

    if (!identity) {
      this.authenticationService.signIn();
      // TODO add to storage
      return;
    }

    this.collectionsFacade.addToLibrary(this.resource, likesLibraryId);
  }

  onRemoveFromLibrary() {
    this.collectionsFacade.removeFromLibrary(this.resource, likesLibraryId);
  }
}

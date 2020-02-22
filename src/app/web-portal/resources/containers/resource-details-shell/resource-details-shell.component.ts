import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ResourceDetailsFacade } from '@web-portal/resources/facades/resource-details.facade';
import { CollectionsFacade } from '@web-portal/collections/facades/collections.facade';
import { UserHistoryService } from '@web-portal/core/services/user-history/user-history.service';

@Component({
  selector: 'app-resource-details-shell',
  templateUrl: './resource-details-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceDetailsShellComponent implements OnDestroy, OnInit {
  resource$ = this.resourceDetailsFacades.query.current$;

  actionsSubscription: Subscription;

  constructor(
    route: ActivatedRoute,
    userHistoryService: UserHistoryService,
    private resourceDetailsFacades: ResourceDetailsFacade,
    private collectionsFacade: CollectionsFacade
  ) {
    this.actionsSubscription = route.params
      .pipe(
        tap(params => {
          resourceDetailsFacades.load(params.id);
          userHistoryService.add(params.id);
        })
      )
      .subscribe();
  }

  ngOnInit() {
    // This is necesary as it's used by like-button-shell
    this.collectionsFacade.loadUserLikes();
  }

  ngOnDestroy(): void {
    this.resourceDetailsFacades.clear();
    this.actionsSubscription.unsubscribe();
  }
}

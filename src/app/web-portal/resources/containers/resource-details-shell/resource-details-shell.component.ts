import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ResourceDetailsFacade } from '@web-portal/resources/facades/resource-details.facade';

@Component({
  selector: 'app-resource-details-shell',
  templateUrl: './resource-details-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceDetailsShellComponent implements OnDestroy {
  resource$ = this.resourceDetailsFacades.query.current$;
  actionsSubscription: Subscription;

  constructor(route: ActivatedRoute, private resourceDetailsFacades: ResourceDetailsFacade) {
    this.actionsSubscription = route.params.pipe(tap(params => resourceDetailsFacades.load(params.id))).subscribe();
  }

  ngOnDestroy(): void {
    this.resourceDetailsFacades.clear();
    this.actionsSubscription.unsubscribe();
  }
}

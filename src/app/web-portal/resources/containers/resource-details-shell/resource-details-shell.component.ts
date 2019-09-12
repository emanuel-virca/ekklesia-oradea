import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ResourceFacade } from '@web-portal/resources/facades/resource.facade';

@Component({
  selector: 'app-resource-details-shell',
  templateUrl: './resource-details-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceDetailsShellComponent implements OnDestroy {
  resource$ = this.resourceFacades.query.current$;
  actionsSubscription: Subscription;

  constructor(route: ActivatedRoute, private resourceFacades: ResourceFacade) {
    this.actionsSubscription = route.params.pipe(tap(params => resourceFacades.load(params.id))).subscribe();
  }

  ngOnDestroy(): void {
    this.resourceFacades.clear();
    this.actionsSubscription.unsubscribe();
  }
}

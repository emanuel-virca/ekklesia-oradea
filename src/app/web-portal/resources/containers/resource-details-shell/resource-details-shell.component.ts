import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { Resource } from '@shared/models/resource.model';

// NgRx
import * as fromResources from '../../reducers';
import { ResourceActions } from '../../actions';

@Component({
  selector: 'app-resource-details-shell',
  templateUrl: './resource-details-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceDetailsShellComponent implements OnDestroy {
  resource$: Observable<Resource>;
  actionsSubscription: Subscription;

  constructor(route: ActivatedRoute, store: Store<fromResources.State>) {
    this.actionsSubscription = route.params
      .pipe(map(params => ResourceActions.selectResource({ id: params.id })))
      .subscribe(store);
    this.resource$ = store.pipe(select(fromResources.getCurrentResource));
  }

  ngOnDestroy(): void {
    this.actionsSubscription.unsubscribe();
  }
}

import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Resource } from '@shared/models/resource.model';
import { CollectionsActions } from '@web-portal/resources/actions';
import * as fromResources from '@web-portal/resources/reducers';
import { OrderByDirection } from '@web-portal/shared/models/order-by-direction';
import { OrderByProp } from '../resources-list/resources-list.component';

@Component({
  selector: 'app-liked-resources',
  templateUrl: './liked-resources.component.html',
  styleUrls: ['./liked-resources.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LikedResourcesComponent implements OnInit, OnDestroy {
  @ViewChild('masonryItemSizer', { static: true }) masonryItemSizer: ElementRef;

  nextPage$: Observable<string>;
  resources$: Observable<Resource[]>;
  orderByDirection$: Observable<OrderByDirection>;
  loading$: Observable<boolean>;

  orderByOptions: OrderByProp[] = [
    {
      value: 'addedOn',
      viewValue: 'Liked Date',
    },
  ];
  selectedOrderedBy: OrderByProp = this.orderByOptions[0];

  constructor(private store: Store<fromResources.State>) {
    this.resources$ = this.store.select(fromResources.getLikedResources);
    this.orderByDirection$ = this.store.select(fromResources.getLikedResourcesOrderByDirection);
    this.nextPage$ = this.store.select(fromResources.getLikedResourcesNextPage);
    this.loading$ = this.store.select(fromResources.getLikedResourcesIsFetching);
  }

  ngOnInit() {
    this.store.dispatch(CollectionsActions.loadLikedResources());
  }

  getNextResources() {
    this.store.dispatch(CollectionsActions.loadLikedResources());
  }

  onRemoveFromLibrary(resource: Resource) {
    this.store.dispatch(CollectionsActions.removeFromLikedResources({ resource }));
  }

  toggleDirection(currentValue: OrderByDirection) {
    const orderByDirection = currentValue === 'asc' ? 'desc' : 'asc';
    this.store.dispatch(CollectionsActions.changeOrderDirection({ orderByDirection }));
  }

  onOrderByChanged(orderedByProp: OrderByProp) {
    this.selectedOrderedBy = orderedByProp;
    this.store.dispatch(CollectionsActions.changeOrderBy({ orderBy: orderedByProp.value }));
  }

  ngOnDestroy() {
    this.store.dispatch(CollectionsActions.clearLikedResources());
  }
}

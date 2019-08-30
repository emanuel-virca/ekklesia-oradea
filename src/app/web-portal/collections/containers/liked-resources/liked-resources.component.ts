import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Resource } from '@shared/models/resource.model';
import { OrderByProp } from '@web-portal/shared/models/order-by-prop';
import { OrderByDirection } from '@web-portal/shared/models/order-by-direction';
import { CollectionsActions } from '@web-portal/collections/actions';
import * as fromCollections from '@web-portal/collections/reducers';

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

  constructor(private store: Store<fromCollections.State>) {
    this.resources$ = this.store.select(fromCollections.getLikedResources);
    this.orderByDirection$ = this.store.select(fromCollections.getLikedResourcesOrderByDirection);
    this.nextPage$ = this.store.select(fromCollections.getLikedResourcesNextPage);
    this.loading$ = this.store.select(fromCollections.getLikedResourcesIsFetching);
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

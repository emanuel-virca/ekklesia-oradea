import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Resource } from '@shared/models/resource.model';
import * as fromResources from '@web-portal/resources/reducers';
import { ResourcesActions, CollectionsActions } from '@web-portal/resources/actions';
import { OrderByDirection } from '@web-portal/shared/models/order-by-direction';

export interface OrderByProp {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcesListComponent implements OnInit, OnDestroy {
  @ViewChild('masonryItemSizer', { static: true }) masonryItemSizer: ElementRef;

  nextPage$: Observable<string>;
  resources$: Observable<Resource[]>;
  loading$: Observable<boolean>;
  orderByDirection$: Observable<OrderByDirection>;
  likedResourceIds$: Observable<string[]>;
  orderByOptions: OrderByProp[] = [
    {
      value: 'dateTime',
      viewValue: 'Published Date',
    },
    {
      value: 'title',
      viewValue: 'Name',
    },
  ];
  selectedOrderedBy: OrderByProp = this.orderByOptions[0];

  constructor(private store: Store<fromResources.State>) {
    this.resources$ = this.store.select(fromResources.getResources);
    this.nextPage$ = this.store.select(fromResources.getResourcesNextPage);
    this.orderByDirection$ = this.store.select(fromResources.getResourcesOrderByDirection);
    this.loading$ = this.store.select(fromResources.getResourcesIsFetching);
    this.likedResourceIds$ = this.store.select(fromResources.getLikedResourceIds);
  }

  ngOnInit() {
    this.store.dispatch(ResourcesActions.loadResources());
    this.store.dispatch(CollectionsActions.loadLikedResourceIds());
  }

  getNextResources() {
    this.store.dispatch(ResourcesActions.loadNextResources());
  }

  toggleDirection(currentValue: OrderByDirection) {
    const orderByDirection = currentValue === 'asc' ? 'desc' : 'asc';
    this.store.dispatch(ResourcesActions.changeResourceOrderDirection({ orderByDirection }));
  }

  onOrderByChanged(orderedByProp: OrderByProp) {
    this.selectedOrderedBy = orderedByProp;
    this.store.dispatch(ResourcesActions.changeResourceOrderBy({ orderBy: orderedByProp.value }));
  }

  onSaveToLibrary(resource: Resource) {
    this.store.dispatch(CollectionsActions.addToLikedResources({ resource }));
  }

  onRemoveFromLibrary(resource: Resource) {
    this.store.dispatch(CollectionsActions.removeFromLikedResources({ resource }));
  }

  ngOnDestroy() {
    this.store.dispatch(ResourcesActions.clearResources());
  }
}

import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Resource } from '@shared/models/resource.model';
import * as fromCollections from '@web-portal/collections/reducers';
import { CollectionsActions } from '@web-portal/collections/actions';
import { OrderByDirection } from '@web-portal/shared/models/order-by-direction';
import { OrderByProp } from '@web-portal/shared/models/order-by-prop';
import { ResourcesFacade } from '@web-portal/resources/facades/resources.facade';

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcesListComponent implements OnInit, OnDestroy {
  @ViewChild('masonryItemSizer', { static: true }) masonryItemSizer: ElementRef;

  nextPage$ = this.resourcesFacade.query.nextPage$;
  resources$ = this.resourcesFacade.query.entities$;
  loading$ = this.resourcesFacade.query.loading$;
  orderByDirection$ = this.resourcesFacade.query.orderByDirection$;
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

  constructor(private store: Store<fromCollections.State>, private resourcesFacade: ResourcesFacade) {
    this.likedResourceIds$ = this.store.select(fromCollections.getLikedResourceIds);
  }

  ngOnInit() {
    this.resourcesFacade.loadEntities();
    this.store.dispatch(CollectionsActions.loadLikedResourceIds());
  }

  getNextResources() {
    this.resourcesFacade.loadNextEntities();
  }

  toggleDirection(currentValue: OrderByDirection) {
    const orderByDirection = currentValue === 'asc' ? 'desc' : 'asc';
    this.resourcesFacade.changeOrderDirection(orderByDirection);
  }

  onOrderByChanged(orderedByProp: OrderByProp) {
    this.selectedOrderedBy = orderedByProp;
    this.resourcesFacade.changeOrderBy(orderedByProp.value);
  }

  onSaveToLibrary(resource: Resource) {
    this.store.dispatch(CollectionsActions.addToLikedResources({ resource }));
  }

  onRemoveFromLibrary(resource: Resource) {
    this.store.dispatch(CollectionsActions.removeFromLikedResources({ resource }));
  }

  ngOnDestroy() {
    this.resourcesFacade.clear();
  }
}

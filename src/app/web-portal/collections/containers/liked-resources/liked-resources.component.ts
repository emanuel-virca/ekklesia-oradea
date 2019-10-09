import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, OnDestroy } from '@angular/core';

import { Resource } from '@shared/models/resource';
import { OrderByProp } from '@web-portal/shared/models/order-by-prop';
import { OrderByDirection } from '@web-portal/shared/models/order-by-direction';
import { CollectionsFacade } from '@web-portal/collections/facades/collections.facade';

@Component({
  selector: 'app-liked-resources',
  templateUrl: './liked-resources.component.html',
  styleUrls: ['./liked-resources.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LikedResourcesComponent implements OnInit, OnDestroy {
  @ViewChild('masonryItemSizer', { static: true }) masonryItemSizer: ElementRef;

  nextPage$ = this.collectionsFacade.query.likedResources.nextPage$;
  resources$ = this.collectionsFacade.query.likedResources.entities$;
  orderByDirection$ = this.collectionsFacade.query.likedResources.orderByDirection$;
  loading$ = this.collectionsFacade.query.likedResources.loading$;
  initialLoading$ = this.collectionsFacade.query.likedResources.initialLoading$;

  orderByOptions: OrderByProp[] = [
    {
      value: 'addedOn',
      viewValue: 'Liked Date',
    },
  ];
  selectedOrderedBy: OrderByProp = this.orderByOptions[0];

  constructor(private collectionsFacade: CollectionsFacade) {}

  ngOnInit() {
    this.collectionsFacade.loadLikedResources();
  }

  loadResources() {
    this.collectionsFacade.loadLikedResources();
  }

  onRemoveFromLibrary(resource: Resource) {
    this.collectionsFacade.removeFromLikedResources(resource);
  }

  toggleDirection(currentValue: OrderByDirection) {
    const orderByDirection = currentValue === 'asc' ? 'desc' : 'asc';
    this.collectionsFacade.changeOrderDirection(orderByDirection);
  }

  onOrderByChanged(orderedByProp: OrderByProp) {
    this.selectedOrderedBy = orderedByProp;
    this.collectionsFacade.changeOrderBy(orderedByProp.value);
  }

  ngOnDestroy() {
    this.collectionsFacade.clear();
  }
}

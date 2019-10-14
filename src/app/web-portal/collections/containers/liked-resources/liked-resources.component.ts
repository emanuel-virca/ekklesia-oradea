import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';

import { Resource, ResourceSnippet } from '@shared/models/resource';
import { OrderByProp } from '@web-portal/shared/models/order-by-prop';
import { OrderByDirection } from '@web-portal/shared/models/order-by-direction';
import { CollectionsFacade } from '@web-portal/collections/facades/collections.facade';
import { LikesLibrary } from '@shared/models/library';

@Component({
  selector: 'app-liked-resources',
  templateUrl: './liked-resources.component.html',
  styleUrls: ['./liked-resources.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LikedResourcesComponent implements OnInit, OnDestroy {
  @ViewChild('masonryItemSizer', { static: true }) masonryItemSizer: ElementRef;

  nextPage$ = this.collectionsFacade.query.likedResources.nextPage$;
  resources$ = this.collectionsFacade.query.likedResources.entities$.pipe(
    map(resources => resources.map<ResourceSnippet>(x => x.resource))
  );
  orderByDirection$ = this.collectionsFacade.query.likedResources.orderByDirection$;
  loading$ = this.collectionsFacade.query.likedResources.loading$;
  initialLoading$ = this.collectionsFacade.query.likedResources.initialLoading$;

  orderByOptions: OrderByProp[] = [
    {
      value: 'sortNo',
      viewValue: 'Liked Date',
    },
    {
      value: 'resource.dateTime',
      viewValue: 'Published Date',
    },
    {
      value: 'resource.title',
      viewValue: 'Name',
    },
  ];
  selectedOrderedBy: OrderByProp = this.orderByOptions[0];

  constructor(private collectionsFacade: CollectionsFacade) {}

  ngOnInit() {
    this.collectionsFacade.loadLibraryResources(LikesLibrary);
  }

  loadResources() {
    this.collectionsFacade.loadLibraryResources(LikesLibrary);
  }

  onRemoveFromLibrary(resource: Resource) {
    this.collectionsFacade.removeFromLibrary(resource, LikesLibrary);
  }

  toggleDirection(currentValue: OrderByDirection) {
    const orderByDirection = currentValue === 'asc' ? 'desc' : 'asc';
    this.collectionsFacade.changeOrderDirection(orderByDirection, LikesLibrary);
  }

  onOrderByChanged(orderedByProp: OrderByProp) {
    this.selectedOrderedBy = orderedByProp;
    this.collectionsFacade.changeOrderBy(orderedByProp.value, LikesLibrary);
  }

  ngOnDestroy() {
    this.collectionsFacade.clear(LikesLibrary);
  }
}

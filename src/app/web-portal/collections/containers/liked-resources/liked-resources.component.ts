import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';

import { ResourceSnippet } from '@shared/models/resource';
import { OrderByProp } from '@web-portal/shared/models/order-by-prop';
import { OrderByDirection } from '@web-portal/shared/models/order-by-direction';
import { CollectionsFacade } from '@web-portal/collections/facades/collections.facade';
import { likesLibraryId } from '@shared/models/library';
import { combineLatest } from 'rxjs';

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
  emptyList$ = combineLatest([this.loading$, this.resources$]).pipe(
    map(([loading, resources]) => {
      return !loading && !(resources || []).length;
    })
  );

  orderByOptions: OrderByProp[] = [
    {
      value: 'sortNo',
      viewValue: 'Data adăugării',
    },
    {
      value: 'resource.dateTime',
      viewValue: 'Data publicării',
    },
    {
      value: 'resource.title',
      viewValue: 'Nume',
    },
  ];
  selectedOrderedBy: OrderByProp = this.orderByOptions[0];

  constructor(private collectionsFacade: CollectionsFacade) {}

  ngOnInit() {
    // This is necesary as it's used by like-button-shell
    this.collectionsFacade.loadUserLikes();
    this.collectionsFacade.loadLibraryResources(likesLibraryId);
  }

  loadResources() {
    this.collectionsFacade.loadLibraryResources(likesLibraryId);
  }

  toggleDirection(currentValue: OrderByDirection) {
    const orderByDirection = currentValue === 'asc' ? 'desc' : 'asc';
    this.collectionsFacade.changeOrderDirection(orderByDirection, likesLibraryId);
  }

  onOrderByChanged(orderedByProp: OrderByProp) {
    this.selectedOrderedBy = orderedByProp;
    this.collectionsFacade.changeOrderBy(orderedByProp.value, likesLibraryId);
  }

  ngOnDestroy() {
    this.collectionsFacade.clear(likesLibraryId);
  }
}

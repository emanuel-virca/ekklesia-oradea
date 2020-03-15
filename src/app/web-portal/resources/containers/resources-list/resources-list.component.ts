import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

import { OrderByDirection } from '@web-portal/shared/models/order-by-direction';
import { OrderByProp } from '@web-portal/shared/models/order-by-prop';
import { ResourcesFacade } from '@web-portal/resources/facades/resources.facade';
import { CollectionsFacade } from '@web-portal/collections/facades/collections.facade';

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
  initialLoading$ = this.resourcesFacade.query.initialLoading$;
  loading$ = this.resourcesFacade.query.loading$;
  orderByDirection$ = this.resourcesFacade.query.orderByDirection$;

  orderByOptions: OrderByProp[] = [
    {
      value: 'dateTime',
      viewValue: 'Data publicării',
    },
    {
      value: 'title',
      viewValue: 'Titlu',
    },
  ];
  selectedOrderedBy: OrderByProp = this.orderByOptions[0];

  constructor(private resourcesFacade: ResourcesFacade, private collectionsFacade: CollectionsFacade) {}

  ngOnInit() {
    this.resourcesFacade.loadEntities();
    // This is necesary as it's used by like-button-shell
    this.collectionsFacade.loadUserLikes();
  }

  loadResources() {
    this.resourcesFacade.loadEntities();
  }

  toggleDirection(currentValue: OrderByDirection) {
    const orderByDirection = currentValue === 'asc' ? 'desc' : 'asc';
    this.resourcesFacade.changeOrderDirection(orderByDirection);
  }

  onOrderByChanged(orderedByProp: OrderByProp) {
    this.selectedOrderedBy = orderedByProp;
    this.resourcesFacade.changeOrderBy(orderedByProp.value);
  }

  ngOnDestroy() {
    this.resourcesFacade.clear();
  }
}

import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Resource } from '@shared/models/resource.model';

import * as fromResources from '@web-portal/resources/reducers';
import { ResourcesActions, ResourceActions } from '@web-portal/resources/actions';
import { OrderByDirection } from '@web-portal/shared/models/order-by-direction';
import { AuthenticationService } from '@authentication/services/authentication/authentication.service';
import { User } from '@shared/models/user.model';
import { filterNotNull } from '@core/rxjs/pipes';

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
  userLibrary$: Observable<string[]>;
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

  constructor(private store: Store<fromResources.State>, private authService: AuthenticationService) {
    this.resources$ = this.store.select(fromResources.getResources);
    this.nextPage$ = this.store.select(fromResources.getResourcesNextPage);
    this.orderByDirection$ = this.store.select(fromResources.getResourcesOrderByDirection);
    this.loading$ = this.store.select(fromResources.getResourcesIsFetching);
    this.userLibrary$ = this.authService.user$.pipe(
      filterNotNull,
      map((user: User) => user.library)
    );
  }

  ngOnInit() {
    this.store.dispatch(ResourcesActions.loadResources());
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
    this.store.dispatch(ResourceActions.saveResourceToLibrary({ resource }));
  }

  onRemoveFromLibrary(resource: Resource) {
    this.store.dispatch(ResourceActions.removeResourceFromLibrary({ resource }));
  }

  ngOnDestroy() {
    this.store.dispatch(ResourcesActions.clearResources());
  }
}

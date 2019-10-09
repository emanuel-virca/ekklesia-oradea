import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { collectionsQuery } from '../reducers/collections.selectors';
import { CollectionsActions } from '../actions';
import { State } from '../reducers/collections.reducer';
import { Resource } from '@shared/models/resource';

@Injectable()
export class CollectionsFacade {
  query = {
    likedResources: {
      entities$: this.store.select(collectionsQuery.getEntities),
      entityIds$: this.store.select(collectionsQuery.getEntityIds),
      orderByDirection$: this.store.select(collectionsQuery.getOrderByDirection),
      nextPage$: this.store.select(collectionsQuery.getNextPage),
      loading$: this.store.select(collectionsQuery.getIsFetching),
      initialLoading$: this.store.select(collectionsQuery.getIsInitialFetching),
    },
  };

  constructor(private store: Store<State>) {}

  loadLikedResources() {
    this.store.dispatch(CollectionsActions.loadLikedResources());
  }

  loadLikedResourceIds() {
    this.store.dispatch(CollectionsActions.loadLikedResourceIds());
  }

  addToLikedResources(resource: Resource) {
    this.store.dispatch(CollectionsActions.addToLikedResources({ resource }));
  }

  removeFromLikedResources(resource: Resource) {
    this.store.dispatch(CollectionsActions.removeFromLikedResources({ resource }));
  }

  changeOrderDirection(orderByDirection: 'desc' | 'asc') {
    this.store.dispatch(CollectionsActions.changeOrderDirection({ orderByDirection }));
  }

  changeOrderBy(orderBy: string) {
    this.store.dispatch(CollectionsActions.changeOrderBy({ orderBy }));
  }

  clear() {
    this.store.dispatch(CollectionsActions.clearLikedResources());
  }
}

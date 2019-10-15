import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { collectionsQuery } from '../reducers/collections.selectors';
import { CollectionsActions } from '../actions';
import { State } from '../reducers/collections.reducer';
import { Resource } from '@shared/models/resource';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

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
      emptyList$: combineLatest([
        this.store.select(collectionsQuery.getIsFetching),
        this.store.select(collectionsQuery.getEntities),
      ]).pipe(
        map(([loading, resources]) => {
          return !loading && !(resources || []).length;
        })
      ),
    },
  };

  constructor(private store: Store<State>) {}

  loadLibraryResources(libraryId: string) {
    this.store.dispatch(CollectionsActions.loadLibraryResources({ libraryId }));
  }

  loadUserLikes() {
    this.store.dispatch(CollectionsActions.loadUserLikes());
  }

  addToLibrary(resource: Resource, libraryId: string) {
    this.store.dispatch(CollectionsActions.addToLibrary({ resource, libraryId }));
  }

  removeFromLibrary(resource: Resource, libraryId) {
    this.store.dispatch(CollectionsActions.removeFromLibrary({ resource, libraryId }));
  }

  changeOrderDirection(orderByDirection: 'desc' | 'asc', libraryId: string) {
    this.store.dispatch(CollectionsActions.changeOrderDirection({ orderByDirection, libraryId }));
  }

  changeOrderBy(orderBy: string, libraryId: string) {
    this.store.dispatch(CollectionsActions.changeOrderBy({ orderBy, libraryId }));
  }

  clear(libraryId: string) {
    this.store.dispatch(CollectionsActions.clearLibraryResources({ libraryId }));
  }
}

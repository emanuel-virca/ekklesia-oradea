import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { resourcesQuery } from '../reducers/resources.selectors';
import { State } from '../reducers/resources.reducer';
import { ResourcesActions } from '../actions';

@Injectable()
export class ResourcesFacade {
  query = {
    entities$: this.store.select(resourcesQuery.getEntities),
    orderByDirection$: this.store.select(resourcesQuery.getOrderByDirection),
    nextPage$: this.store.select(resourcesQuery.getNextPage),
    loading$: this.store.select(resourcesQuery.getIsFetching),
  };

  constructor(private store: Store<State>) {}

  loadEntities() {
    this.store.dispatch(ResourcesActions.loadResources());
  }

  changeOrderDirection(orderByDirection: 'desc' | 'asc') {
    this.store.dispatch(ResourcesActions.changeResourceOrderDirection({ orderByDirection }));
  }

  changeOrderBy(orderBy: string) {
    this.store.dispatch(ResourcesActions.changeResourceOrderBy({ orderBy }));
  }

  clear() {
    this.store.dispatch(ResourcesActions.clearResources());
  }
}

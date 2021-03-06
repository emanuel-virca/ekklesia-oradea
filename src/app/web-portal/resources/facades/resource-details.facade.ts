import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { State } from '../reducers/resources.reducer';
import { ResourceActions } from '../actions';
import { resourceQuery } from '../reducers/resource-details.selectors';

@Injectable()
export class ResourceDetailsFacade {
  query = {
    current$: this.store.select(resourceQuery.getCurrent),
  };

  constructor(private store: Store<State>) {}

  load(id: string) {
    this.store.dispatch(ResourceActions.selectResource({ id }));
  }

  clear() {
    this.store.dispatch(ResourceActions.clearSelectedResource());
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap, withLatestFrom } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { ResourceService } from '@web-portal/resources/services/resource/resource.service';

// NgRx
import { ResourcesActions, ResourcesApiActions } from '../actions';
import * as fromResources from '../reducers';

@Injectable()
export class ResourcesEffects {
  constructor(
    private actions$: Actions<ResourcesActions.ResourcesActionsUnion>,
    private resourceService: ResourceService,
    private store: Store<fromResources.State>
  ) {}

  @Effect()
  loadResources$: Observable<Action> = this.actions$.pipe(
    ofType(ResourcesActions.loadResources.type),
    mergeMap(async action => {
      try {
        const resources = await this.resourceService.query(action.pageSize, null, action.orderByDirection);
        return ResourcesApiActions.loadResourcesSuccess({ resources });
      } catch (err) {
        return ResourcesApiActions.loadResourcesFailure(err);
      }
    })
  );

  @Effect()
  loadNextResources$: Observable<Action> = this.actions$.pipe(
    ofType(ResourcesActions.loadNextResources.type),
    withLatestFrom(this.store.select(fromResources.getResourcesState)),
    mergeMap(async ([, state]) => {
      if (state.currentPage > 0 && !state.startAfter) {
        return null;
      }

      try {
        const resources = await this.resourceService.query(state.pageSize, state.startAfter, state.orderByDirection);
        return ResourcesApiActions.loadResourcesSuccess({ resources });
      } catch (err) {
        return ResourcesApiActions.loadResourcesFailure(err);
      }
    })
  );
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, catchError, map, withLatestFrom, take } from 'rxjs/operators';
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
    withLatestFrom(this.store.select(fromResources.getResourcesState)),
    mergeMap(([, state]) => {
      if (state.currentPage > 0 && !state.startAfter) {
        return null;
      }

      return this.resourceService.query(state.pageSize, state.startAfter, state.orderByDirection).pipe(
        take(1),
        map(resources => ResourcesApiActions.loadResourcesSuccess({ resources })),
        catchError(err => of(ResourcesApiActions.loadResourcesFailure(err)))
      );
    })
  );
}

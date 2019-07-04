import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap, withLatestFrom, filter } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { ResourceService } from '@web-portal/resources/services/resource/resource.service';

// NgRx
import { ResourcesActions, ResourcesApiActions } from '../actions';
import * as fromResources from '../reducers';
import { LoaderService } from '@core/services/loader/loader.service';

@Injectable()
export class ResourcesEffects {
  constructor(
    private actions$: Actions<ResourcesActions.ResourcesActionsUnion>,
    private resourceService: ResourceService,
    private store: Store<fromResources.State>,
    private loaderService: LoaderService
  ) {}

  @Effect()
  loadResources$: Observable<Action> = this.actions$.pipe(
    ofType(
      ResourcesActions.loadResources.type,
      ResourcesActions.changeResourceOrderDirection.type,
      ResourcesActions.changeResourceOrderBy
    ),
    withLatestFrom(this.store.select(fromResources.getResourcesState)),
    mergeMap(async ([, store]) => {
      this.loaderService.show();
      try {
        const resources = await this.resourceService.query(
          store.pageSize,
          store.startAfter,
          store.orderBy,
          store.orderByDirection
        );
        return ResourcesApiActions.loadResourcesSuccess({ resources });
      } catch (err) {
        return ResourcesApiActions.loadResourcesFailure(err);
      } finally {
        this.loaderService.hide();
      }
    })
  );

  @Effect()
  loadNextResources$: Observable<Action> = this.actions$.pipe(
    ofType(ResourcesActions.loadNextResources.type),
    withLatestFrom(this.store.select(fromResources.getResourcesState)),
    filter(([, state]) => state.startAfter != null),
    mergeMap(async ([, state]) => {
      this.loaderService.show();
      try {
        const resources = await this.resourceService.query(
          state.pageSize,
          state.startAfter,
          state.orderBy,
          state.orderByDirection
        );
        return ResourcesApiActions.loadResourcesSuccess({ resources });
      } catch (err) {
        return ResourcesApiActions.loadResourcesFailure(err);
      } finally {
        this.loaderService.hide();
      }
    })
  );
}

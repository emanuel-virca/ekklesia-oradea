import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap, withLatestFrom } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { ResourcesService } from '@web-portal/core/services/resources/resources.service';
import { LoaderService } from '@core/services/loader/loader.service';

// NgRx
import { ResourcesActions, ResourcesApiActions } from '../actions';
import * as fromResources from '../reducers';
import { resourcesQuery } from '../reducers/resources.selectors';

@Injectable()
export class ResourcesEffects {
  constructor(
    private actions$: Actions<ResourcesActions.ResourcesActionsUnion>,
    private resourcesService: ResourcesService,
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
    withLatestFrom(this.store.select(resourcesQuery.getState)),
    mergeMap(async ([, state]) => {
      this.loaderService.show();
      try {
        const resources = await this.resourcesService.get(
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

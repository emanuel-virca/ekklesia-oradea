import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { ResourcesService } from '@web-portal/core/services/resources/resources.service';

// NgRx
import { ResourceApiActions, ResourceActions } from '../actions';

@Injectable()
export class ResourceEffects {
  constructor(
    private actions$: Actions<ResourceActions.ResourceActionsUnion>,
    private resourceService: ResourcesService
  ) {}

  @Effect()
  loadResources$: Observable<Action> = this.actions$.pipe(
    ofType(ResourceActions.selectResource.type),
    mergeMap(({ id }) =>
      this.resourceService.getById(id).pipe(
        map(resource => ResourceApiActions.loadResourceSuccess({ resource })),
        catchError(err => of(ResourceApiActions.loadResourceFailure(err)))
      )
    )
  );
}

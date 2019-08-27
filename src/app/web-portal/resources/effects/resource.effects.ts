import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { ResourceService } from '@web-portal/resources/services/resource/resource.service';

// NgRx
import { ResourceApiActions, ResourceActions } from '../actions';

@Injectable()
export class ResourceEffects {
  constructor(
    private actions$: Actions<ResourceActions.ResourceActionsUnion>,
    private resourceService: ResourceService
  ) {}

  @Effect()
  loadResource$: Observable<Action> = this.actions$.pipe(
    ofType(ResourceActions.selectResource.type),
    mergeMap(({ id }) =>
      this.resourceService.get(id).pipe(
        map(resource => ResourceApiActions.loadResourceSuccess({ resource })),
        catchError(err => of(ResourceApiActions.loadResourceFailure(err)))
      )
    )
  );
}

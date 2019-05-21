import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { ResourceService } from '@web-portal/resources/services/resource/resource.service';

// NgRx
import * as resourceActions from './resource.actions';

@Injectable()
export class ResourceEffects {
  constructor(private actions$: Actions, private resourceService: ResourceService) {}

  @Effect()
  loadResources$: Observable<Action> = this.actions$.pipe(
    ofType(resourceActions.LOAD_RESOURCE),
    map((action: resourceActions.LoadResource) => action.payload),
    switchMap(resourceId =>
      this.resourceService.get(resourceId).pipe(
        map(resource => {
          console.log(resource);
          return new resourceActions.LoadResourceSuccess(resource);
        }),
        catchError(err => {
          console.log(err);
          return of(new resourceActions.LoadResourceFail(err));
        })
      )
    )
  );
}

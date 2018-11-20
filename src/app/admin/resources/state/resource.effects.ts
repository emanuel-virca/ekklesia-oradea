import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as resourceActions from './resource.actions';
import { ResourceService } from '../services/resource/resource.service';
import { Resource } from 'src/app/shared/models/resource.model';

@Injectable()
export class ResourceEffects {
  constructor(
    private actions$: Actions,
    private resourceService: ResourceService,
  ) { }

  @Effect()
  loadResources$: Observable<Action> = this.actions$.pipe(
    ofType(resourceActions.LOAD_RESOURCES),
    switchMap(action =>
      this.resourceService.query(9999, null, 'desc').pipe(
        map(resources => new resourceActions.LoadResourcesSuccess(resources)),
        catchError(err => of(new resourceActions.LoadResourcesFail(err)))
      )
    )
  );
}

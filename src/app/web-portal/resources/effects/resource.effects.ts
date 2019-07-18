import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, catchError, map, withLatestFrom } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { ResourceService } from '@web-portal/resources/services/resource/resource.service';

// NgRx
import { ResourceApiActions, ResourceActions } from '../actions';
import { AuthenticationService } from '@authentication/services/authentication/authentication.service';

@Injectable()
export class ResourceEffects {
  constructor(
    private actions$: Actions<ResourceActions.ResourceActionsUnion>,
    private resourceService: ResourceService,
    private authService: AuthenticationService
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

  @Effect()
  saveResourceToLibrary$: Observable<Action> = this.actions$.pipe(
    ofType(ResourceActions.saveResourceToLibrary.type),
    withLatestFrom(this.authService.user$),
    mergeMap(async ([{ resource }, user]) => {
      try {
        await this.resourceService.saveToLibraryAsync(resource, user.uid);
        return ResourceApiActions.saveResourceToLibrarySuccess({ resource });
      } catch (error) {
        return ResourceApiActions.saveResourceToLibraryFailure(error);
      }
    })
  );

  @Effect()
  removeResourceFromLibrary$: Observable<Action> = this.actions$.pipe(
    ofType(ResourceActions.removeResourceFromLibrary.type),
    withLatestFrom(this.authService.user$),
    mergeMap(async ([{ resource }, user]) => {
      try {
        await this.resourceService.removeFromLibraryAsync(resource, user.uid);
        return ResourceApiActions.removeResourceFromLibrarySuccess({ resource });
      } catch (error) {
        return ResourceApiActions.removeResourceFromLibraryFailure(error);
      }
    })
  );
}

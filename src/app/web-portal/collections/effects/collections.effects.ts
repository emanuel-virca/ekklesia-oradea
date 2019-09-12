import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { combineLatest, switchMap, catchError, withLatestFrom, mergeMap } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { LoaderService } from '@core/services/loader/loader.service';
import { AuthenticationService } from '@authentication/services/authentication/authentication.service';
import { CollectionsService } from '@web-portal/core/services/collections/collections.service';
import * as fromCollections from '../reducers';
import { CollectionsActions, CollectionsApiActions } from '../actions';
import { collectionsQuery } from '../reducers/collections.selectors';

@Injectable()
export class CollectionEffects {
  constructor(
    private actions$: Actions<CollectionsActions.CollectionsActionsUnion>,
    private collectionsService: CollectionsService,
    private loaderService: LoaderService,
    private authService: AuthenticationService,
    private store: Store<fromCollections.State>
  ) {}

  @Effect()
  loadLikedResources$: Observable<Action> = this.actions$.pipe(
    ofType(
      CollectionsActions.loadLikedResources.type,
      CollectionsActions.changeOrderBy.type,
      CollectionsActions.changeOrderDirection
    ),
    withLatestFrom(this.store.select(collectionsQuery.getState), this.authService.user$),
    switchMap(async ([, state, user]) => {
      this.loaderService.show();

      try {
        const likedResources = await this.collectionsService.getLikedResources(
          user.uid,
          state.pageSize,
          state.startAfter,
          state.orderBy,
          state.orderByDirection
        );
        return CollectionsApiActions.loadLikedResourcesSuccess({ likedResources });
      } catch (err) {
        return CollectionsApiActions.loadLikedResourcesFailure(err);
      } finally {
        this.loaderService.hide();
      }
    }),
    catchError(error => {
      console.log(error);
      return of(null);
    })
  );

  @Effect()
  saveResourceToLibrary$: Observable<Action> = this.actions$.pipe(
    ofType(CollectionsActions.addToLikedResources.type),
    withLatestFrom(this.authService.user$),
    mergeMap(async ([{ resource }, user]) => {
      try {
        await this.collectionsService.addToLikedResourcesAsync(resource.id, user.uid);
        return CollectionsApiActions.addToLikedResourcesSuccess({ resource });
      } catch (error) {
        return CollectionsApiActions.addToLikedResourcesFailure(error);
      }
    })
  );

  @Effect()
  removeResourceFromLibrary$: Observable<Action> = this.actions$.pipe(
    ofType(CollectionsActions.removeFromLikedResources.type),
    withLatestFrom(this.authService.user$),
    mergeMap(async ([{ resource }, user]) => {
      try {
        await this.collectionsService.removeFromLikedResourcesAsync(resource.id, user.uid);
        return CollectionsApiActions.removeFromLikedResourcesSuccess({ resource });
      } catch (error) {
        return CollectionsApiActions.removeFromLikedResourcesFailure(error);
      }
    })
  );

  @Effect()
  loadLikedResourceIds$: Observable<Action> = this.actions$.pipe(
    ofType(CollectionsActions.loadLikedResourceIds.type),
    combineLatest(this.authService.user$),
    switchMap(async ([, user]) => {
      this.loaderService.show();

      try {
        const resourceIds = await this.collectionsService.getLikedResourceIds(user.uid);
        return CollectionsApiActions.loadLikedResourceIdsSuccess({ resourceIds });
      } catch (err) {
        return CollectionsApiActions.loadLikedResourceIdsFailure(err);
      } finally {
        this.loaderService.hide();
      }
    }),
    catchError(error => {
      console.log(error);
      return of(null);
    })
  );
}

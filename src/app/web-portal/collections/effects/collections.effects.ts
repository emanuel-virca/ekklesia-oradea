import { Injectable } from '@angular/core';
import { Observable, of, combineLatest } from 'rxjs';
import { switchMap, catchError, mergeMap, map, concatMap, withLatestFrom, take, filter } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { AuthenticationService } from '@authentication/services/authentication/authentication.service';
import { CollectionsService } from '@web-portal/core/services/collections/collections.service';
import * as fromCollections from '../reducers';
import { CollectionsActions, CollectionsApiActions } from '../actions';
import { collectionsQuery } from '../reducers/collections.selectors';
import { NotificationsService } from '@core/services/notifications/notifications.service';

@Injectable()
export class CollectionEffects {
  constructor(
    private actions$: Actions<CollectionsActions.CollectionsActionsUnion>,
    private collectionsService: CollectionsService,
    private authService: AuthenticationService,
    private store: Store<fromCollections.State>,
    private notificationService: NotificationsService
  ) {}

  @Effect()
  loadLibraryResources$: Observable<Action> = this.actions$.pipe(
    ofType(
      CollectionsActions.loadLibraryResources,
      CollectionsActions.changeOrderBy,
      CollectionsActions.changeOrderDirection
    ),
    concatMap(action => of(action).pipe(withLatestFrom(this.store.select(collectionsQuery.getState)))),
    switchMap(async ([{ libraryId }, state]) => {
      const user = await this.authService.user$.pipe(take(1)).toPromise();

      try {
        const likedResources = await this.collectionsService.getLibraryResources(
          user.uid,
          libraryId,
          state.pageSize,
          state.startAfter,
          state.orderBy,
          state.orderByDirection
        );
        return CollectionsApiActions.loadLibraryResourcesSuccess({ likedResources });
      } catch (err) {
        return CollectionsApiActions.loadLibraryResourcesFailure(err);
      }
    }),
    catchError(error => {
      console.log(error);
      return of(null);
    })
  );

  @Effect()
  addToLibrary$: Observable<Action> = this.actions$.pipe(
    ofType(CollectionsActions.addToLibrary),
    mergeMap(async ({ resource, libraryId }) => {
      try {
        const user = await this.authService.user$.pipe(take(1)).toPromise();

        await this.collectionsService.addToLibraryAsync(resource.id, user.uid, libraryId);

        this.notificationService.success('Added to your Liked songs!');

        return CollectionsApiActions.addToLibrarySuccess({ resource, libraryId });
      } catch (error) {
        return CollectionsApiActions.addToLibraryFailure(error);
      }
    })
  );

  @Effect()
  removeFromLibrary$: Observable<Action> = this.actions$.pipe(
    ofType(CollectionsActions.removeFromLibrary.type),
    mergeMap(async ({ resource, libraryId }) => {
      try {
        const user = await this.authService.user$.pipe(take(1)).toPromise();

        await this.collectionsService.removeFromLibraryAsync(resource.id, user.uid, libraryId);

        this.notificationService.success('Removed from your Liked songs!');

        return CollectionsApiActions.removeFromLibrarySuccess({ resource, libraryId });
      } catch (error) {
        return CollectionsApiActions.removeFromLibraryFailure(error);
      }
    })
  );

  @Effect()
  loadUserLikes$: Observable<Action> = this.actions$.pipe(
    ofType(CollectionsActions.loadUserLikes),
    concatMap(action => combineLatest([of(action), this.authService.user$.pipe(filter(x => !!x))])),
    switchMap(([, user]) =>
      this.collectionsService.getUserLikes(user.uid).pipe(
        map(userLikes => CollectionsApiActions.loadUserLikesSuccess(userLikes)),
        catchError(err => of(CollectionsApiActions.loadUserLikesFailure(err)))
      )
    )
  );
}

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { Resource } from '@shared/models/resource.model';
import { ResourceService } from '@admin/resources/services/resource/resource.service';

// NxRx
import * as resourceActions from './resource.actions';

@Injectable()
export class ResourceEffects {
  constructor(private actions$: Actions, private resourceService: ResourceService) {}

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

  @Effect()
  publishResource$: Observable<Action> = this.actions$.pipe(
    ofType(resourceActions.PUBLISH_RESOURCE),
    map((action: resourceActions.PublishResource) => action.payload),
    switchMap(async (resourceId: string) => {
      try {
        await this.resourceService.publishAsync(resourceId);
        return new resourceActions.PublishResourceSuccess();
      } catch (err) {
        return new resourceActions.PublishResourceFail(err);
      }
    })
  );

  @Effect()
  unpublishResource$: Observable<Action> = this.actions$.pipe(
    ofType(resourceActions.UNPUBLISH_RESOURCE),
    map((action: resourceActions.UnpublishResource) => action.payload),
    switchMap(async (resourceId: string) => {
      try {
        await this.resourceService.unpublishAsync(resourceId);
        return new resourceActions.UnpublishResourceSuccess();
      } catch (err) {
        return new resourceActions.UnpublishResourceFail(err);
      }
    })
  );

  @Effect()
  createResource$: Observable<Action> = this.actions$.pipe(
    ofType(resourceActions.CREATE_RESOURCE),
    map((action: resourceActions.CreateResource) => action.payload),
    switchMap(async (resource: Resource) => {
      try {
        const createdResource = await this.resourceService.createAsync(resource);
        return new resourceActions.CreateResourceSuccess(createdResource);
      } catch (err) {
        return new resourceActions.CreateResourceFail(err);
      }
    })
  );

  @Effect()
  updateResource$: Observable<Action> = this.actions$.pipe(
    ofType(resourceActions.UPDATE_RESOURCE),
    map((action: resourceActions.UpdateResource) => action.payload),
    switchMap(async (resource: Resource) => {
      try {
        await this.resourceService.updateAsync(resource);
        return new resourceActions.UpdateResourceSuccess(resource);
      } catch (err) {
        return new resourceActions.UpdateResourceFail(err);
      }
    })
  );

  @Effect()
  deleteResource$: Observable<Action> = this.actions$.pipe(
    ofType(resourceActions.DELETE_RESOURCE),
    map((action: resourceActions.DeleteResource) => action.payload),
    switchMap(async (resourceId: string) => {
      try {
        await this.resourceService.deleteAsync(resourceId);
        return new resourceActions.DeleteResourceSuccess();
      } catch (err) {
        return new resourceActions.DeleteResourceFail(err);
      }
    })
  );
}

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import { Resource } from '../../../../shared/models/resource.model';
import { mapItemWithId, mapArrayWithId } from '../../../../shared/rxjs/pipes';
import { LoaderService } from '../../../../core/services/loader/loader.service';
import { ResourceSearchService } from '../resource-search/resource-search.service';


@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  itemsCollection: AngularFirestoreCollection<any>;

  constructor(
    private db: AngularFirestore,
    private loaderService: LoaderService,
    private resourceSearchService: ResourceSearchService,
  ) {
    this.itemsCollection = this.db.collection<any>('resources');
  }

  public async createAsync(resource: Resource): Promise<Resource> {
    this.loaderService.show();

    try {
      const resourceDocumnetReference = await this.itemsCollection.add(resource);

      resource.id = resourceDocumnetReference.id;

      await this.resourceSearchService.addAsync(resource);

    } catch (e) {
      console.log(e);
    }

    this.loaderService.hide();

    return resource;
  }

  public async updateAsync(resource: Resource): Promise<void> {
    await this.itemsCollection.doc(resource.id).update(resource);

    await this.resourceSearchService.updateAsync(resource);
  }

  public get(resourceId: string): Observable<Resource> {
    return this.itemsCollection.doc<Resource>(resourceId).snapshotChanges().pipe(mapItemWithId);
  }

  public query(pageSize: number, lastVisible?: Resource, orderBy?: firebase.firestore.OrderByDirection): Observable<Resource[]> {
    return this.db.collection<Resource>('resources', ref => {
      if (lastVisible) {
        if (orderBy) {
          return ref.orderBy('dateTime', orderBy).startAfter(lastVisible.dateTime).limit(pageSize);
        } else {
          return ref.startAfter(lastVisible.dateTime).limit(pageSize);
        }
      } else {
        if (orderBy) {
          return ref.orderBy('dateTime', orderBy).limit(pageSize);
        } else {
          return ref.limit(pageSize);
        }
      }
    }).snapshotChanges().pipe(mapArrayWithId);
  }
}

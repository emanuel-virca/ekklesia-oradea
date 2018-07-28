import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { mapItemWithId, mapArrayWithId } from '../../rxjs/pipes';

import { LoaderService } from '../../../core/services/loader/loader.service';
import { Resource } from '../../models/resource.model';
import { ResourceSearchService } from '../../../admin/resources/services/resource-search.service';

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

  async createAsync(resource: Resource): Promise<Resource> {
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

  query(pageSize: number, lastVisible?: Resource, orderBy?: firebase.firestore.OrderByDirection): Observable<Resource[]> {
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

  get(resourceId: string): Observable<Resource> {
    return this.itemsCollection.doc<Resource>(resourceId).snapshotChanges().pipe(mapItemWithId);
  }

  async updateAsync(resourceId: string, resource: Resource): Promise<void> {
    await this.itemsCollection.doc(resourceId).update(resource);
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { LoaderService } from '@core/services/loader/loader.service';
import { Resource } from '@shared/models/resource';
import { mapItemWithId, mapArrayWithId } from '@core/rxjs/pipes';

@Injectable()
export class ResourceService {
  itemsCollection: AngularFirestoreCollection<Resource>;

  constructor(private db: AngularFirestore, private loaderService: LoaderService) {
    this.itemsCollection = this.db.collection<Resource>('resources');
  }

  public async createAsync(resource: Resource): Promise<Resource> {
    this.loaderService.show();

    try {
      const resourceDocumnetReference = await this.itemsCollection.add(resource);

      resource.id = resourceDocumnetReference.id;
    } catch (e) {
      console.log(e);
    }

    this.loaderService.hide();

    return resource;
  }

  public async updateAsync(resource: Resource): Promise<void> {
    await this.itemsCollection.doc(resource.id).update(resource);
  }

  public async deleteAsync(resourceId: string): Promise<void> {
    await this.itemsCollection.doc(resourceId).delete();
  }

  public get(resourceId: string): Observable<Resource> {
    return this.itemsCollection
      .doc(resourceId)
      .snapshotChanges()
      .pipe(mapItemWithId);
  }

  public query(
    pageSize: number,
    lastVisible?: Resource,
    orderBy?: firebase.firestore.OrderByDirection
  ): Observable<Resource[]> {
    return this.db
      .collection<Resource>('resources', ref => {
        if (lastVisible) {
          if (orderBy) {
            return ref
              .orderBy('dateTime', orderBy)
              .startAfter(lastVisible.dateTime)
              .limit(pageSize);
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
      })
      .snapshotChanges()
      .pipe(mapArrayWithId);
  }

  public async publishAsync(resourceId: string) {
    await this.itemsCollection.doc(resourceId).update({ published: true });
  }

  public async unpublishAsync(resourceId: string) {
    await this.itemsCollection.doc(resourceId).update({ published: false });
  }
}

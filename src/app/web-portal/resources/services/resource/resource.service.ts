import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { mapItemWithId, mapArrayWithId } from '@core/rxjs/pipes';

import { Resource } from '@shared/models/resource.model';

@Injectable()
export class ResourceService {
  itemsCollection: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore) {
    this.itemsCollection = this.db.collection<any>('resources');
  }

  public query(
    pageSize: number,
    startAfter?: any,
    orderByDirection?: firebase.firestore.OrderByDirection
  ): Observable<Resource[]> {
    // TODO reduce complexity
    return this.db
      .collection<Resource>('resources', ref => {
        if (startAfter) {
          if (orderByDirection) {
            return ref
              .where('published', '==', true)
              .orderBy('dateTime', orderByDirection)
              .startAfter(startAfter)
              .limit(pageSize);
          } else {
            return ref
              .where('published', '==', true)
              .startAfter(startAfter)
              .limit(pageSize);
          }
        } else {
          if (orderByDirection) {
            return ref
              .where('published', '==', true)
              .orderBy('dateTime', orderByDirection)
              .limit(pageSize);
          } else {
            return ref.where('published', '==', true).limit(pageSize);
          }
        }
      })
      .snapshotChanges()
      .pipe(mapArrayWithId);
  }

  public get(resourceId: string): Observable<Resource> {
    return this.itemsCollection
      .doc<Resource>(resourceId)
      .snapshotChanges()
      .pipe(mapItemWithId);
  }
}

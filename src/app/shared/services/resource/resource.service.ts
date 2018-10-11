import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { mapItemWithId, mapArrayWithId } from '../../rxjs/pipes';

import { Resource } from '../../models/resource.model';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  itemsCollection: AngularFirestoreCollection<any>;

  constructor(
    private db: AngularFirestore
  ) {
    this.itemsCollection = this.db.collection<any>('resources');
  }

  public query(pageSize: number, lastVisible?: Resource, orderBy?: firebase.firestore.OrderByDirection): Observable<Resource[]> {
    return this.db.collection<Resource>('resources', ref => {
      if (lastVisible) {
        if (orderBy) {
          return ref.where('published', '==', true).orderBy('dateTime', orderBy).startAfter(lastVisible.dateTime).limit(pageSize);
        } else {
          return ref.where('published', '==', true).startAfter(lastVisible.dateTime).limit(pageSize);
        }
      } else {
        if (orderBy) {
          return ref.where('published', '==', true).orderBy('dateTime', orderBy).limit(pageSize);
        } else {
          return ref.where('published', '==', true).limit(pageSize);
        }
      }
    }).snapshotChanges().pipe(mapArrayWithId);
  }

  public get(resourceId: string): Observable<Resource> {
    return this.itemsCollection.doc<Resource>(resourceId).snapshotChanges().pipe(mapItemWithId);
  }
}

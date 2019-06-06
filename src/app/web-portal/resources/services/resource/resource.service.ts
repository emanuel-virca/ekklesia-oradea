import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { mapItemWithId } from '@core/rxjs/pipes';

import { Resource } from '@shared/models/resource.model';

@Injectable()
export class ResourceService {
  constructor(private db: AngularFirestore) {}

  public async query(
    pageSize: number,
    startAfter?: any,
    orderByDirection?: firebase.firestore.OrderByDirection
  ): Promise<Resource[]> {
    const snapshotChanges = await this.db
      .collection<Resource>('resources', ref => {
        let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        query = query.where('published', '==', true);
        query = query.limit(pageSize);
        if (orderByDirection) {
          query = query.orderBy('dateTime', orderByDirection);
        }
        if (startAfter) {
          query = query.startAfter(startAfter);
        }
        return query;
      })
      .ref.get();

    return this.mapQuerySnapshotToResource(snapshotChanges);
  }

  public get(resourceId: string): Observable<Resource> {
    return this.db
      .collection<Resource>('resources')
      .doc<Resource>(resourceId)
      .snapshotChanges()
      .pipe(mapItemWithId);
  }

  public mapQuerySnapshotToResource(snapshotChanges: firebase.firestore.QuerySnapshot): Resource[] {
    return snapshotChanges.docs.map<Resource>(x => ({ id: x.id, ...(x.data() as Resource) }));
  }
}

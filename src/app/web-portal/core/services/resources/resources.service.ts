import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

import { mapItemWithId } from '@core/rxjs/pipes';
import { Resource } from '@shared/models/resource';

@Injectable()
export class ResourcesService {
  constructor(private db: AngularFirestore) {}

  public async get(
    pageSize: number,
    startAfter?: any,
    orderBy?: string,
    orderByDirection?: firebase.firestore.OrderByDirection
  ): Promise<Resource[]> {
    let query = this.db
      .collection<Resource>('resource-snippets')
      .ref.where('published', '==', true)
      .orderBy(orderBy, orderByDirection)
      .limit(pageSize);

    if (startAfter) {
      query = query.startAfter(startAfter);
    }
    try {
      const snapshotChanges = await query.get();

      return this.mapQuerySnapshotToResource(snapshotChanges);
    } catch (error) {
      console.log(error);
    }
  }

  public getById(resourceId: string): Observable<Resource> {
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

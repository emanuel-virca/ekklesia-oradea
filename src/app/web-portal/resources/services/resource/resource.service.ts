import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { mapItemWithId } from '@core/rxjs/pipes';
import * as firebase from 'firebase';

import { Resource } from '@shared/models/resource.model';
import { User } from '@shared/models/user.model';

@Injectable()
export class ResourceService {
  constructor(private db: AngularFirestore) {}

  public async query(
    pageSize: number,
    startAfter?: any,
    orderBy?: string,
    orderByDirection?: firebase.firestore.OrderByDirection
  ): Promise<Resource[]> {
    let query = this.db
      .collection<Resource>('resources')
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

  public async saveToLibraryAsync(resource: Resource, userId: string): Promise<void> {
    await this.db.doc<User>(`users/${userId}`).ref.set(
      {
        library: firebase.firestore.FieldValue.arrayUnion(resource.id),
      },
      { merge: true }
    );
  }

  public async removeFromLibraryAsync(resource: Resource, userId: string): Promise<void> {
    await this.db.doc<User>(`users/${userId}`).ref.set(
      {
        library: firebase.firestore.FieldValue.arrayRemove(resource.id),
      },
      { merge: true }
    );
  }
}

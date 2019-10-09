import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

import { UserLikes } from '@shared/models/user-likes';
import { Resource } from '@shared/models/resource';

@Injectable()
export class CollectionsService {
  constructor(private db: AngularFirestore) {}

  public async getLikedResources(
    userId: string,
    pageSize: number,
    startAfter?: any,
    orderBy?: string,
    orderByDirection?: firebase.firestore.OrderByDirection
  ): Promise<Resource[]> {
    let query = this.db
      .collection<Resource>(`libraries/${userId}_likes/library-resources`)
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

  public mapQuerySnapshotToResource(snapshotChanges: firebase.firestore.QuerySnapshot): Resource[] {
    return snapshotChanges.docs.map<Resource>(x => ({ id: x.id, ...(x.data() as Resource) }));
  }

  public async addToLikedResourcesAsync(resourceId: string, userId: string): Promise<void> {
    await this.db
      .collection<UserLikes>('user-likes')
      .doc(userId)
      .set(
        {
          resourceIds: firebase.firestore.FieldValue.arrayUnion(resourceId),
        },
        { merge: true }
      );
  }

  public async removeFromLikedResourcesAsync(resourceId: string, userId: string): Promise<void> {
    await this.db
      .collection(`user-likes`)
      .doc(userId)
      .set(
        {
          resourceIds: firebase.firestore.FieldValue.arrayRemove(resourceId),
        },
        { merge: true }
      );
  }

  public getUserLikes(userId: string): Observable<UserLikes> {
    return this.db
      .collection(`user-likes`)
      .doc<UserLikes>(userId)
      .valueChanges();
  }
}
// work with arrays
// library: firebase.firestore.FieldValue.arrayUnion(resource.id),
// library: firebase.firestore.FieldValue.arrayRemove(resource.id),

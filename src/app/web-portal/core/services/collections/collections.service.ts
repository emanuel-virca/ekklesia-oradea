import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

import { UserLikes } from '@shared/models/user-likes';
import { LibraryResource, LikesLibrary } from '@shared/models/library';

@Injectable()
export class CollectionsService {
  constructor(private db: AngularFirestore) {}

  public async getLibraryResources(
    userId: string,
    libraryId: string,
    pageSize: number,
    startAfter?: any,
    orderBy?: string,
    orderByDirection?: firebase.firestore.OrderByDirection
  ): Promise<LibraryResource[]> {
    let query = this.db
      .collection<LibraryResource>(`libraries/${userId}_${libraryId}/library-resources`)
      .ref.where('resource.published', '==', true)
      .orderBy(orderBy, orderByDirection)
      .limit(pageSize);

    if (startAfter) {
      query = query.startAfter(startAfter);
    }

    try {
      const snapshotChanges = await query.get();
      return this.mapQuerySnapshotToLibraryResource(snapshotChanges);
    } catch (error) {
      console.log(error);
    }
  }

  public mapQuerySnapshotToLibraryResource(snapshotChanges: firebase.firestore.QuerySnapshot): LibraryResource[] {
    return snapshotChanges.docs.map<LibraryResource>(x => x.data() as LibraryResource);
  }

  public async addToLibraryAsync(resourceId: string, userId: string, libraryId: string): Promise<void> {
    if (libraryId === LikesLibrary) {
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
  }

  public async removeFromLibraryAsync(resourceId: string, userId: string, libraryId: string): Promise<void> {
    if (libraryId === LikesLibrary) {
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

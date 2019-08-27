import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FireSQL } from 'firesql';

import { LikedResource } from '@web-portal/shared/models/liked-resource.model';
import { Resource } from '@shared/models/resource.model';

@Injectable()
export class CollectionsService {
  constructor(private db: AngularFirestore) {}

  public async getLikedResources(
    userId: string,
    pageSize: number,
    startAfter?: any,
    orderBy?: string,
    orderByDirection?: firebase.firestore.OrderByDirection
  ): Promise<LikedResource[]> {
    let queryLiked = this.db
      .collection<LikedResource>('liked-resources')
      .ref.where('userId', '==', userId)
      .orderBy(orderBy, orderByDirection)
      .limit(pageSize);

    if (startAfter) {
      queryLiked = queryLiked.startAfter(userId + '_' + startAfter);
    }

    try {
      const snapshotChanges = await queryLiked.get();

      const likedResources = snapshotChanges.docs.map<LikedResource>(x => x.data() as LikedResource);

      const fireSQL = new FireSQL(this.db.firestore);

      const resourceIds = likedResources.map(x => '"' + x.resourceId + '"');

      const query = `Select * from resources where __name__ in (${resourceIds.join(',')})`;

      const resources: Resource[] = (await fireSQL.query(query, { includeId: 'id' })) as Resource[];

      likedResources.forEach(x => (x.resource = resources.find(r => r.id === x.resourceId)));

      return likedResources;
    } catch (error) {
      console.log(error);
    }
  }

  public async addToLikedResourcesAsync(resourceId: string, userId: string): Promise<void> {
    await this.db.doc(`liked-resources/${userId}_${resourceId}`).ref.set({
      resourceId,
      userId,
      addedOn: new Date(),
    });
  }

  public async removeFromLikedResourcesAsync(resourceId: string, userId: string): Promise<void> {
    await this.db.doc(`liked-resources/${userId}_${resourceId}`).delete();
  }

  public async getLikedResourceIds(userId: string): Promise<string[]> {
    const likedResources = await this.db
      .collection<LikedResource>(`liked-resources`)
      .ref.where('userId', '==', userId)
      .get();

    return likedResources.docs.map(x => x.data().resourceId);
  }
}
// work with arrays
// library: firebase.firestore.FieldValue.arrayUnion(resource.id),
// library: firebase.firestore.FieldValue.arrayRemove(resource.id),

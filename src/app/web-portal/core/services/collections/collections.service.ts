import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { LikedResource } from '@web-portal/shared/models/liked-resource.model';
import { ResourcesService } from '@web-portal/core/services/resources/resources.service';

@Injectable()
export class CollectionsService {
  constructor(private db: AngularFirestore, private resourcesService: ResourcesService) {}

  public async getLikedResources(
    userId: string,
    pageSize: number,
    startAfter?: any,
    orderBy?: string,
    orderByDirection?: firebase.firestore.OrderByDirection
  ): Promise<LikedResource[]> {
    let query = this.db
      .collection<LikedResource>('liked-resources')
      .ref.where('userId', '==', userId)
      .orderBy(orderBy, orderByDirection)
      .limit(pageSize);

    if (startAfter) {
      query = query.startAfter(startAfter);
    }

    try {
      const snapshotChanges = await query.get();

      const likedResources = snapshotChanges.docs.map<LikedResource>(x => x.data() as LikedResource);

      const resourceIds = likedResources.map(x => '"' + x.resourceId + '"');

      const resources = await this.resourcesService.getByIds(resourceIds);

      return likedResources.map(x => ({ ...x, resource: resources.find(r => r.id === x.resourceId) }));
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

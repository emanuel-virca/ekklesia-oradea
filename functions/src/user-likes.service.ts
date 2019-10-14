import * as admin from 'firebase-admin';

export class UserLikesService {
  db = admin.firestore();
  userLikesCollection = this.db.collection('user-likes');

  public async unlikeResourceAsync(resourceId: string): Promise<void> {
    const batch = this.db.batch();

    const items = await this.userLikesCollection.where('resourceIds', 'array-contains', resourceId).get();

    const chunkSize = 100;

    for (let i = 0; i < items.size; i += chunkSize) {
      items.docs.slice(i, i + chunkSize).forEach(x => {
        batch.set(x.ref, { resourceIds: admin.firestore.FieldValue.arrayRemove(resourceId) }, { merge: true });
      });

      await batch.commit();
    }
  }
}

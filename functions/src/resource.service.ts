import * as admin from 'firebase-admin';

import { Author } from './models/author';

export class ResourceService {
  db = admin.firestore();
  resourcesCollection = this.db.collection('resources');

  public async updateAuthorAsync(author: Author): Promise<void> {
    const items = await this.resourcesCollection.where('author.id', '==', author.id).get();

    const batch = this.db.batch();

    const chunkSize = 100;

    for (let i = 0; i < items.size; i += chunkSize) {
      items.docs.slice(i, i + chunkSize).forEach(x => {
        batch.set(x.ref, { author: author }, { merge: true });
      });

      await batch.commit();
    }
  }
}

import * as admin from 'firebase-admin';

import { Author } from './models/author';

export class ResourceService {
  public async updateAuthorAsync(author: Author): Promise<void> {
    const db = admin.firestore();

    const docs = await db
      .collection('resources')
      .where('author.id', '==', author.id)
      .get();

    const batch = db.batch();

    docs.forEach(async resource => {
      batch.set(db.doc(`resources/${resource.id}`), { author: author }, { merge: true });
    });

    // Commit the batch
    await batch.commit();
  }
}

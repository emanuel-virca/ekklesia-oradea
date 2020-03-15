import * as admin from 'firebase-admin';

import { User } from './models/user';
import { ResourceSnippet } from './models/resource';

export class UserService {
  db = admin.firestore();

  public async createIfNotExistsAsync(uid: string): Promise<User> {
    let userDoc = await this.db.doc(`users/${uid}`).get();

    if (userDoc && !userDoc.exists) {
      await userDoc.ref.create({ roles: ['subscriber'] });

      userDoc = await userDoc.ref.get();
    }

    return userDoc.data() as User;
  }

  public async addHistoryAsync(userId: string, resourceId: string): Promise<void> {
    const db = admin.firestore();

    const resourceSnippetDoc = await db.doc(`resource-snippets/${resourceId}`).get();

    const resourceSnippet = resourceSnippetDoc.data() as ResourceSnippet;

    await db
      .collection(`users/${userId}/history`)
      .doc(resourceSnippet.id)
      .set({ resource: { id: resourceId, ...resourceSnippet }, dateTime: new Date() });
  }
}

import * as admin from 'firebase-admin';

import { User } from './models/user';

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
}

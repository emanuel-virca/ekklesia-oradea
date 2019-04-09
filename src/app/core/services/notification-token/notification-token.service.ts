import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class NotificationTokenService {
  constructor(private afs: AngularFirestore) {}

  async copy(destinationUserId, sourceUserId) {
    const sourceNotificationTokensCollection = await this.afs
      .doc(`users/${sourceUserId}`)
      .collection('notificationTokens')
      .get()
      .toPromise();

    const sourceNotificationTokensCollectionData = sourceNotificationTokensCollection.docs.map(d => d.data());

    // TODO collection batch copy
    sourceNotificationTokensCollectionData.forEach(async element => {
      await this.afs
        .doc(`users/${destinationUserId}`)
        .collection('notificationTokens')
        .add(element);
    });
  }
}

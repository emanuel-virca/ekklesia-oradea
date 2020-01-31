import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';

import { AuthenticationService } from '@authentication/services/authentication.service';

@Injectable()
export class MessagingService {
  constructor(
    private angularFireMessaging: AngularFireMessaging,
    private authenticationService: AuthenticationService,
    private afs: AngularFirestore
  ) {
    this.angularFireMessaging.messaging.subscribe(messaging => {
      messaging.onMessage = messaging.onMessage.bind(messaging);
      messaging.onTokenRefresh = messaging.onTokenRefresh.bind(messaging);
    });
  }

  /**
   * update token in firebase database
   *
   * @param userId user
   * @param token token
   */
  async updateTokenAsync(token: string): Promise<void> {
    if (!token) {
      return;
    }

    const identity = await this.authenticationService.identity$.pipe(take(1)).toPromise();

    const userId = identity ? identity.profile.sub : 'auth_generic';

    await this.afs
      .doc(`messagings/${userId}`)
      .set({ tokens: firebase.firestore.FieldValue.arrayUnion(token) }, { merge: true });
  }

  /**
   * request permission for notification from firebase cloud messaging
   *
   */
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      async token => {
        await this.updateTokenAsync(token);
      },
      err => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  /**
   * hook method when new notification received in foreground
   */
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(payload => {
      console.log('new message received. ', payload);
    });
  }
}

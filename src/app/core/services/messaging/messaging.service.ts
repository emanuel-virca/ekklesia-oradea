import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

import { User } from '@shared/models/user.model';

@Injectable()
export class MessagingService {
  currentMessage = new BehaviorSubject(null);

  constructor(
    private db: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    private angularFireMessaging: AngularFireMessaging
  ) {
    this.angularFireMessaging.messaging.subscribe(_messaging => {
      _messaging.onMessage = _messaging.onMessage.bind(_messaging);
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    });
  }

  /**
   * update token in firebase database
   *
   * @param userId user
   * @param token token
   */
  updateToken(user: User, token: string) {
    const currentTokens = user.notificationTokens || {};

    // If token does not exist in firestore, update db
    if (!currentTokens[token]) {
      const notificationTokens = this.db
        .collection('users')
        .doc(user.uid)
        .collection('notificationTokens');
      notificationTokens.add({ [token]: true });
    }
  }

  /**
   * request permission for notification from firebase cloud messaging
   *
   * @param user user
   */
  requestPermission(user: User) {
    this.angularFireMessaging.requestToken.subscribe(
      token => {
        console.log(token);
        this.updateToken(user, token);
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
      this.currentMessage.next(payload);
    });
  }
}

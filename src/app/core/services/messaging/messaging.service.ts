import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';

import { User } from '@shared/models/user.model';
import { UserService } from '../user/user.service';

@Injectable()
export class MessagingService {
  constructor(private angularFireMessaging: AngularFireMessaging, private userService: UserService) {
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
  async updateTokenAsync(user: User, token: string): Promise<void> {
    // If token already exists in firestore, update db
    if (!user || (user.notificationTokens && user.notificationTokens.indexOf(token) !== -1)) {
      return;
    }

    user.notificationTokens = user.notificationTokens || [];
    user.notificationTokens.push(token);

    await this.userService.update(user);
  }

  /**
   * request permission for notification from firebase cloud messaging
   *
   * @param user user
   */
  requestPermission(user: User) {
    this.angularFireMessaging.requestToken.subscribe(
      async token => {
        await this.updateTokenAsync(user, token);
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

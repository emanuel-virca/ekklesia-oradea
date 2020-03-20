import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { AuthenticationService } from '@authentication/services/authentication.service';
import { SwPush } from '@angular/service-worker';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class MessagingService {
  private subscribed = new BehaviorSubject<boolean>(true);
  subscribed$ = this.subscribed.asObservable();

  private subscribing = new BehaviorSubject<boolean>(false);
  subscribing$ = this.subscribing.asObservable();

  constructor(
    private authenticationService: AuthenticationService,
    private notificationService: NotificationsService,
    private afs: AngularFirestore,
    private swPush: SwPush
  ) {}

  async intializeAsync() {
    await this.registerServiceWorkerAsync();

    this.swPush.messages.subscribe(msg => console.log('push message', msg));
    this.swPush.notificationClicks.subscribe(event => {
      console.log('Received notification: ', event);
    });

    if (Notification.permission === 'default') {
      this.subscribed.next(false);
    }

    if (Notification.permission === 'granted') {
      const messaging = firebase.messaging();

      // Get Instance ID token. Initially this makes a network call, once retrieved
      // subsequent calls to getToken will return from cache.
      try {
        const currentToken = await messaging.getToken();
        console.log('token', currentToken);
        await this.saveTokenAsync(currentToken);
      } catch (err) {
        console.log('Unable to retrieve token. ', err);
      }

      // Callback fired if Instance ID token is updated.
      messaging.onTokenRefresh(async () => {
        try {
          const currentToken = await messaging.getToken();
          console.log('refreshed token ', currentToken);
          await this.saveTokenAsync(currentToken);
          this.subscribed.next(true);
        } catch (err) {
          console.log('Unable to retrieve refreshed token. ', err);
        }
      });
    }
  }

  async registerServiceWorkerAsync() {
    await navigator.serviceWorker.ready;

    const swr = await navigator.serviceWorker.getRegistration();

    if (!swr) {
      console.log('No service worker registered');
      return;
    }

    firebase.messaging().useServiceWorker(swr);
  }

  /**
   * update token in firebase database
   *
   * @param userId user
   * @param token token
   */
  async saveTokenAsync(token: string): Promise<void> {
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
  async requestPermissionAsync() {
    try {
      this.subscribing.next(true);

      const messaging = firebase.messaging();

      await messaging.requestPermission();

      const token = await messaging.getToken();

      this.subscribing.next(false);

      this.notificationService.success('Mulțumim pentru abonare!');

      await this.saveTokenAsync(token);

      this.subscribed.next(true);
    } catch (err) {
      this.notificationService.error('Abonarea la notificari nu s-a putut realiza!');
    } finally {
      this.subscribing.next(false);
    }
  }
}

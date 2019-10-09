import * as admin from 'firebase-admin';

import { Resource } from '../models/resource';
import { subscriptionTopic } from './notification.consts';
import { WebPortalConfig } from '../web-portal.config';

export class NotificationService {
  public async sendResourceNotificationAsync(resource: Resource, webPortalConfig: WebPortalConfig): Promise<void> {
    const message: admin.messaging.Message = {
      topic: subscriptionTopic,
      notification: {
        title: 'New Resource Published',
        body: resource.title + '\n' + resource.description,
      },
      webpush: {
        notification: {
          icon: '/assets/icons/icon-192x192.png',
          badge: '/assets/icons/icon-badge-192x192.png',
          image: resource.image ? resource.image.url : null,
          tag: resource.id + resource.type,
        },
        fcmOptions: {
          link: `${webPortalConfig.domainURL}/resources/${resource.id}`,
        },
      },
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    await admin.messaging().send(message);
  }

  public async subscribeToTopicAsync(notificationTokens: string[]) {
    await admin
      .messaging()
      .subscribeToTopic(notificationTokens, subscriptionTopic)
      .then(function(response) {
        console.log('Successfully subscribed to topic:', response);
      })
      .catch(function(error) {
        console.log('Error subscribing to topic:', error);
      });
  }
}

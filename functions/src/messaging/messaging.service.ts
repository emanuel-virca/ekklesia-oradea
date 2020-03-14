import * as admin from 'firebase-admin';

import { Resource } from '../models/resource';
import { subscriptionTopic } from './messaging.consts';
import { WebPortalConfig } from '../web-portal.config';

export class MessagingService {
  public async sendResourceNotificationAsync(resource: Resource, webPortalConfig: WebPortalConfig): Promise<void> {
    const message: admin.messaging.Message = {
      topic: subscriptionTopic,
      notification: {
        title: resource.title,
        body: resource.author.name + '\n' + resource.description,
      },
      webpush: {
        notification: {
          icon: '/assets/icons/icon-badge.png',
          badge: '/assets/icons/icon-badge.png',
          image: resource.cover ? resource.cover.url : null,
          tag: resource.id + resource.type,
          data: { url: `${webPortalConfig.domainurl}/resources/${resource.id}` },
        },
        fcmOptions: {
          link: `${webPortalConfig.domainurl}/resources/${resource.id}`,
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

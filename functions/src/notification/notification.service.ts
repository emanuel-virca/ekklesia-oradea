import * as admin from 'firebase-admin';

import { Resource } from '../models/resource';
import { subscriptionTopic } from './notification.consts';

export class NotificationService {
  public async sendResourceNotificationAsync(resource: Resource): Promise<void> {
    const message: admin.messaging.Message = {
      topic: subscriptionTopic,
      notification: {
        title: 'badge 1',
        body: resource.title + '\n' + resource.description,
      },
      webpush: {
        notification: {
          icon: '/assets/icons/icon-192x192.png',
          badge: '/assets/icons/icon-badge-192x192.png',
          image: resource.imageSrc,
          tag: resource.id + resource.resourceType,
        },
      },
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    await admin.messaging().send(message);
  }
}

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { subscriptionTopic } from './notification.consts';

export async function onNotificationWriteAsync(
  change: functions.Change<FirebaseFirestore.DocumentSnapshot>,
  context: functions.EventContext
) {
  const notificationToken = change.after.data();
  console.log('Try to subscribed to topic:', JSON.stringify(notificationToken));

  admin
    .messaging()
    .subscribeToTopic(Object.keys(notificationToken), subscriptionTopic)
    .then(function(response) {
      console.log('Successfully subscribed to topic:', response);
    })
    .catch(function(error) {
      console.log('Error subscribing to topic:', error);
    });
}

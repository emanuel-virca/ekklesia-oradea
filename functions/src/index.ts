import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { onResourceCreateAsync, onResourceDeleteAsync, onResourceUpdateAsync } from './resources-triggers';
import { onAuthorUpdateAsync } from './authors-triggers';
import { onNotificationWriteAsync } from './notification/notification-triggers';

const algoliaConfig = {
  applicationId: functions.config().algolia.applicationid,
  apiKey: functions.config().algolia.apikey,
  adminApiKey: functions.config().algolia.adminapikey,
  resourceIndex: functions.config().algolia.resourceindex,
};

admin.initializeApp(functions.config().firebase);

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
exports.onResourceCreated = functions.firestore.document('resources/{resourceId}').onCreate(async (snap, context) => {
  await onResourceCreateAsync(snap, context, algoliaConfig);
});

exports.onResourceUpdated = functions.firestore.document('resources/{resourceId}').onUpdate(async (change, context) => {
  await onResourceUpdateAsync(change, context, algoliaConfig);
});

exports.onResourceDeleted = functions.firestore.document('resources/{resourceId}').onDelete(async (snap, context) => {
  await onResourceDeleteAsync(snap, context, algoliaConfig);
});

exports.onAuthorUpdated = functions.firestore.document('authors/{authorId}').onUpdate(async (change, context) => {
  await onAuthorUpdateAsync(change, context, algoliaConfig);
});

exports.onUserNotificationTokensUpdated = functions.firestore
  .document('users/{userId}/notificationTokens/{notificationToken}')
  .onWrite(async (change, context) => {
    await onNotificationWriteAsync(change, context);
  });

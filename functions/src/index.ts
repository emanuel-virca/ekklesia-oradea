import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { onResourceCreateAsync, onResourceDeleteAsync, onResourceUpdateAsync } from './resources-triggers';
import { onAuthorUpdateAsync } from './authors-triggers';
import { onUserWriteAsync, onAddHistoryAsync } from './user-triggers';
import { onUserLikesWriteAsync } from './user-likes-triggers';
import { WebPortalConfig } from './web-portal.config';
import { onMessagingWriteAsync } from './messaging/messaging-triggers';
import { onFileWriteAsync } from './files-triggers';
import authModdleware from './authentication.middleware';

const algoliaConfig = {
  applicationId: functions.config().algolia.applicationid,
  apiKey: functions.config().algolia.apikey,
  adminApiKey: functions.config().algolia.adminapikey,
  resourceIndex: functions.config().algolia.resourceindex,
};

const webportalConfig: WebPortalConfig = functions.config().webportal;

admin.initializeApp(functions.config().firebase);

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
exports.onResourceCreated = functions
  .region('europe-west1')
  .firestore.document('resources/{resourceId}')
  .onCreate(async (snap, context) => {
    await onResourceCreateAsync(snap, context, algoliaConfig);
  });

exports.onResourceUpdated = functions
  .region('europe-west1')
  .firestore.document('resources/{resourceId}')
  .onUpdate(async (change, context) => {
    await onResourceUpdateAsync(change, context, algoliaConfig, webportalConfig);
  });

exports.onResourceDeleted = functions
  .region('europe-west1')
  .firestore.document('resources/{resourceId}')
  .onDelete(async (snap, context) => {
    await onResourceDeleteAsync(snap, context, algoliaConfig);
  });

exports.onAuthorUpdated = functions
  .region('europe-west1')
  .firestore.document('authors/{authorId}')
  .onUpdate(async (change, context) => {
    await onAuthorUpdateAsync(change, context, algoliaConfig);
  });

exports.onUserUpdated = functions
  .region('europe-west1')
  .firestore.document('users/{userId}')
  .onWrite(async (change, context) => {
    await onUserWriteAsync(change, context);
  });

exports.onMessagingUpdated = functions
  .region('europe-west1')
  .firestore.document('messagings/{userId}')
  .onWrite(async (change, context) => {
    await onMessagingWriteAsync(change, context);
  });

exports.onUserLikesUpdated = functions
  .region('europe-west1')
  .firestore.document('user-likes/{userId}')
  .onWrite(async (change, context) => {
    await onUserLikesWriteAsync(change, context);
  });

exports.onFileUploaded = functions
  .region('europe-west1')
  .storage.object()
  .onFinalize(async object => {
    await onFileWriteAsync(object);
  });

exports.addHistory = functions.region('europe-west1').https.onCall(async (data, context) => {
  await onAddHistoryAsync(context.auth.uid, data.resourceId);
});

exports.auth = functions.region('europe-west1').https.onRequest(authModdleware);

// https://medium.com/@jwngr/demystifying-firebase-auth-tokens-e0c533ed330c

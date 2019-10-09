import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { onResourceCreateAsync, onResourceDeleteAsync, onResourceUpdateAsync } from './resources-triggers';
import { onAuthorUpdateAsync } from './authors-triggers';
import { onUserWriteAsync } from './user-triggers';
import { onUserLikesWriteAsync } from './user-likes-triggers';

const algoliaConfig = {
  applicationId: functions.config().algolia.applicationid,
  apiKey: functions.config().algolia.apikey,
  adminApiKey: functions.config().algolia.adminapikey,
  resourceIndex: functions.config().algolia.resourceindex,
};

const webportalConfig = {
  domainURL: functions.config().webportal.domainurl,
};

admin.initializeApp(functions.config().firebase);

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
exports.onResourceCreated = functions.firestore.document('resources/{resourceId}').onCreate(async (snap, context) => {
  await onResourceCreateAsync(snap, context, algoliaConfig);
});

exports.onResourceUpdated = functions.firestore.document('resources/{resourceId}').onUpdate(async (change, context) => {
  await onResourceUpdateAsync(change, context, algoliaConfig, webportalConfig);
});

exports.onResourceDeleted = functions.firestore.document('resources/{resourceId}').onDelete(async (snap, context) => {
  await onResourceDeleteAsync(snap, context, algoliaConfig);
});

exports.onAuthorUpdated = functions.firestore.document('authors/{authorId}').onUpdate(async (change, context) => {
  await onAuthorUpdateAsync(change, context, algoliaConfig);
});

exports.onUserUpdated = functions.firestore.document('users/{userId}').onWrite(async (change, context) => {
  await onUserWriteAsync(change, context);
});

exports.onUserLikesUpdated = functions.firestore.document('user-likes/{userId}').onWrite(async (change, context) => {
  await onUserLikesWriteAsync(change, context);
});

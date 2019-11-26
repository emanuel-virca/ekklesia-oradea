import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import { onResourceCreateAsync, onResourceDeleteAsync, onResourceUpdateAsync } from './resources-triggers';
import { onAuthorUpdateAsync } from './authors-triggers';
import { onUserWriteAsync } from './user-triggers';
import { onUserLikesWriteAsync } from './user-likes-triggers';
import { AuthConfig } from './auth.config';
import { WebPortalConfig } from './web-portal.config';

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
  .region('europe-west2')
  .firestore.document('resources/{resourceId}')
  .onCreate(async (snap, context) => {
    await onResourceCreateAsync(snap, context, algoliaConfig);
  });

exports.onResourceUpdated = functions
  .region('europe-west2')
  .firestore.document('resources/{resourceId}')
  .onUpdate(async (change, context) => {
    await onResourceUpdateAsync(change, context, algoliaConfig, webportalConfig);
  });

exports.onResourceDeleted = functions
  .region('europe-west2')
  .firestore.document('resources/{resourceId}')
  .onDelete(async (snap, context) => {
    await onResourceDeleteAsync(snap, context, algoliaConfig);
  });

exports.onAuthorUpdated = functions
  .region('europe-west2')
  .firestore.document('authors/{authorId}')
  .onUpdate(async (change, context) => {
    await onAuthorUpdateAsync(change, context, algoliaConfig);
  });

exports.onUserUpdated = functions
  .region('europe-west2')
  .firestore.document('users/{userId}')
  .onWrite(async (change, context) => {
    await onUserWriteAsync(change, context);
  });

exports.onUserLikesUpdated = functions
  .region('europe-west2')
  .firestore.document('user-likes/{userId}')
  .onWrite(async (change, context) => {
    await onUserLikesWriteAsync(change, context);
  });

const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Json Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add middleware to authenticate requests

const authConfig: AuthConfig = functions.config().auth;

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),
  audience: authConfig.apiAudience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: 'RS256',
});

app.use(jwtCheck);

// GET object containing Firebase custom token
app.get('/firebase', async (req, res) => {
  const { sub: uid } = req.user;

  try {
    const firebaseToken = await admin.auth().createCustomToken(uid);
    res.json({ firebaseToken });
  } catch (err) {
    res.status(500).send({
      message: 'Something went wrong acquiring a Firebase token.',
      error: err,
    });
  }
});

exports.auth = functions.region('europe-west2').https.onRequest(app);

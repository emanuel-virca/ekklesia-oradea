import * as functions from 'firebase-functions';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import { AuthConfig } from './auth.config';
import { AuthenticationService } from './authentication.service';

const express = require('express');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const authModdleware = express();

const authConfig: AuthConfig = functions.config().auth;

// Automatically allow cross-origin requests
authModdleware.use(cors({ origin: true }));

// Json Parser
authModdleware.use(bodyParser.json());
authModdleware.use(bodyParser.urlencoded({ extended: false }));

// Add middleware to authenticate requests
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

authModdleware.use(jwtCheck);

// GET object containing Firebase custom token
authModdleware.get('/firebase', async (req, res) => {
  AuthenticationService;
  console.log('authenticating: ' + req.user.sub);

  const { sub: uid } = req.user;

  const authenticationService = new AuthenticationService();

  try {
    const firebaseToken = await authenticationService.authenticateAsync(uid);
    res.json({ firebaseToken });
  } catch (err) {
    console.log('Something went wrong acquiring a Firebase token. ', err);

    res.status(500).send({
      message: 'Something went wrong acquiring a Firebase token.',
      error: err,
    });
  }
});

export default authModdleware;

import * as functions from 'firebase-functions';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import { AuthConfig } from './auth.config';
import { AuthenticationService } from './authentication.service';

const express = require('express');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const authMiddleware = express();

const authConfig: AuthConfig = functions.config().auth;

// Automatically allow cross-origin requests
authMiddleware.use(cors({ origin: true }));

// Json Parser
authMiddleware.use(bodyParser.json());
authMiddleware.use(bodyParser.urlencoded({ extended: false }));

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

authMiddleware.use(jwtCheck);

// GET object containing Firebase custom token
authMiddleware.get('/firebase', async (req, res) => {
  AuthenticationService;
  console.log('authenticating: ' + req.user.sub);

  const { sub: uid } = req.user;

  const authenticationService = new AuthenticationService();

  try {
    const firebaseToken = await authenticationService.authenticateAsync(uid);
    res.json({ firebaseToken });
  } catch (err) {
    console.log('Something went wrong acquiring a Firebase token. ', JSON.stringify(err));

    res.status(500).send({
      message: 'Something went wrong acquiring a Firebase token.',
      error: err,
    });
  }
});

export default authMiddleware;

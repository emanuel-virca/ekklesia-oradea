import * as admin from 'firebase-admin';

import { UserService } from './user.service';

export class AuthenticationService {
  public async authenticateAsync(uid): Promise<string> {
    console.log('authenticating: ' + uid);

    const userService = new UserService();

    const user = await userService.createIfNotExistsAsync(uid);

    const claims = { roles: user.roles };

    return await admin.auth().createCustomToken(uid, claims);
  }
}

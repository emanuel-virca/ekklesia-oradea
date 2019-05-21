import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from '@shared/models/user.model';
import { UserService } from '@core/services/user/user.service';

@Injectable()
export class AuthenticationService {
  user$: Observable<User>;
  userRoles: Array<string>; // roles of currently logged in uer

  constructor(private afAuth: AngularFireAuth, private userService: UserService) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          // signed in
          return this.userService.get(user.uid);
        } else {
          // not signed in
          return of(null);
        }
      })
    );
  }

  // google
  doGoogleSignIn() {
    return this.oAuthLogin(this.getGoogleAuthProvider());
  }

  async linkGoogle() {
    try {
      const credential = await this.afAuth.auth.currentUser.linkWithPopup(this.getGoogleAuthProvider());
      return this.updateUserDataWithCredentials(credential);
    } catch (ex) {
      if (ex.code !== 'auth/credential-already-in-use') {
        return;
      }

      // Get reference to the currently signed-in user
      const anonymousUser = this.afAuth.auth.currentUser;

      // Sign in user with google Account
      const credential = auth.GoogleAuthProvider.credential(ex.credential.idToken);
      const currentUser = await this.afAuth.auth.signInWithCredential(credential);

      // Merge prevUser and currentUser data stored in Firebase.
      //await this.userService.upgradeAnnonymous(currentUser.uid, anonymousUser.uid);

      // After data is migrated delete the duplicate user
      await this.userService.delete(anonymousUser.uid);

      await anonymousUser.delete();
    }
  }

  private getGoogleAuthProvider(): auth.GoogleAuthProvider {
    const provider = new auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    return provider;
  }

  // anonymous
  async doAnonymousLogin(): Promise<void> {
    const credential = await this.afAuth.auth.signInAnonymously();
    return this.updateUserDataWithCredentials(credential);
  }

  private async oAuthLogin(provider): Promise<void> {
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserDataWithCredentials(credential);
  }

  private updateUserDataWithCredentials(userCredential: auth.UserCredential) {
    const data: User = {
      uid: userCredential.user.uid,
      displayName: userCredential.user.displayName,
      profile: userCredential.additionalUserInfo.profile || null,
      email: userCredential.user.email,
      roles: {
        subscriber: true,
      },
      isAnonymous: userCredential.user.isAnonymous,
    };

    return this.userService.update(data);
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }
}

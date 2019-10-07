import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User, UserProfile } from '@shared/models/user';
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
      return this.updateUserDataWithCredentials(credential, typeof auth.GoogleAuthProvider);
    } catch (ex) {
      if (ex.code !== 'auth/credential-already-in-use') {
        return;
      }

      await this.mergeConflictsAsync(ex);
    }
  }

  private getGoogleAuthProvider(): auth.GoogleAuthProvider {
    const provider = new auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    return provider;
  }

  // facebook
  doFacebookSignIn() {
    return this.oAuthLogin(this.getFacebookAuthProvider());
  }

  async linkFacebook() {
    try {
      const credential = await this.afAuth.auth.currentUser.linkWithPopup(this.getFacebookAuthProvider());
      return this.updateUserDataWithCredentials(credential, typeof auth.FacebookAuthProvider);
    } catch (ex) {
      if (ex.code !== 'auth/credential-already-in-use') {
        return;
      }

      await this.mergeConflictsAsync(ex);
    }
  }

  private getFacebookAuthProvider(): auth.FacebookAuthProvider {
    const provider = new auth.FacebookAuthProvider();
    provider.addScope('email');
    provider.setCustomParameters({
      auth_type: 'rerequest',
    });

    return provider;
  }

  // anonymous
  public async doAnonymousLogin(): Promise<void> {
    const credential = await this.afAuth.auth.signInAnonymously();
    return this.updateUserDataWithCredentials(credential);
  }

  private async oAuthLogin(provider: auth.AuthProvider): Promise<void> {
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserDataWithCredentials(credential, typeof provider);
  }

  public updateUserDataWithCredentials(userCredential: auth.UserCredential, provider?: any) {
    const data: User = {
      uid: userCredential.user.uid,
      displayName: userCredential.user.displayName,
      profile: this.readProfile(userCredential),
      email: userCredential.user.email,
      roles: {
        subscriber: true,
      },
      isAnonymous: userCredential.user.isAnonymous,
    };

    return this.userService.update(data);
  }

  public async mergeConflictsAsync(ex: any) {
    // Get reference to the currently signed-in user
    const anonymousUser = this.afAuth.auth.currentUser;

    // Sign in user with new account
    const currentUser: auth.UserCredential = await this.afAuth.auth.signInWithCredential(ex.credential);

    // Merge prevUser and currentUser data stored in Firebase.
    await this.userService.upgradeAnnonymous(currentUser.user.uid, anonymousUser.uid);

    // After data is migrated delete the duplicate user
    await this.userService.delete(anonymousUser.uid);

    await anonymousUser.delete();
  }

  private readProfile(userCredential: auth.UserCredential): UserProfile {
    if (!userCredential || !userCredential.additionalUserInfo || !userCredential.additionalUserInfo.profile) {
      return null;
    }

    switch (userCredential.credential.providerId) {
      case auth.FacebookAuthProvider.PROVIDER_ID: {
        return this.readFacebookProfile(userCredential.additionalUserInfo.profile);
      }
      case auth.GoogleAuthProvider.PROVIDER_ID: {
        return this.readGoogleProfile(userCredential.additionalUserInfo.profile);
      }

      default: {
        return null;
      }
    }
  }

  private readFacebookProfile(profile: any): UserProfile {
    if (!profile) {
      return null;
    }

    return {
      id: profile.id,
      email: profile.email,
      firstName: profile.first_name,
      lastName: profile.last_name,
      name: profile.name,
      picture: profile.picture.data.is_silhouette ? null : profile.picture.data.url,
    };
  }

  private readGoogleProfile(profile: any): UserProfile {
    if (!profile) {
      return null;
    }

    return {
      id: profile.id,
      email: profile.email,
      locale: profile.locale,
      firstName: profile.given_name,
      lastName: profile.family_name,
      name: profile.name,
      picture: profile.picture,
    };
  }

  public signOut() {
    return this.afAuth.auth.signOut();
  }
}

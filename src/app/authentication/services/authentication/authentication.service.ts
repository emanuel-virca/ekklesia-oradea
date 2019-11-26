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
}

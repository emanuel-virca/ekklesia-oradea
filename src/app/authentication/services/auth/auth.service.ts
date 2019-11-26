import { Injectable } from '@angular/core';
import { OidcFacade } from 'ng-oidc-client';
import { take, tap, filter } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { User as OidcUser } from 'oidc-client';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';

import { environment } from '@env/environment';
import { User } from '@shared/models/user';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class AuthService {
  identity$: Observable<OidcUser>;
  firebaseIdentity$: Observable<User>;
  loggedIn$: Observable<boolean>;

  constructor(
    private oidcFacade: OidcFacade,
    private httpClient: HttpClient,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {
    this.identity$ = this.oidcFacade.identity$;
    this.loggedIn$ = this.oidcFacade.loggedIn$;
  }

  public init(): Promise<void> {
    this.oidcFacade.getOidcUser();

    return new Promise(resolve => {
      combineLatest([this.oidcFacade.waitForAuthenticationLoaded(), this.oidcFacade.loggedIn$])
        .pipe(
          take(1),
          tap(() => {
            this.firebaseLogin();
            resolve();
          })
        )
        .subscribe();
    });
  }

  public signIn() {
    this.oidcFacade.signinRedirect();
  }

  public signOut() {
    this.oidcFacade.signoutRedirect();
  }

  public firebaseLogin() {
    this.identity$.pipe(filter(user => !!user)).subscribe(async user => {
      await this.updateFirebaseUser(user);

      const firebaseToken = await this.getFirebaseToken(user.access_token);

      if (!firebaseToken) {
        return;
      }

      this.setFirebaseToken(firebaseToken);
    });
  }

  public async getFirebaseToken(accessToken) {
    try {
      const token = await this.httpClient
        .get<{ firebaseToken: string }>(environment.api.url + '/auth/firebase', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .toPromise();

      return token.firebaseToken;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  public async setFirebaseToken(firebaseToken: string) {
    await this.afAuth.auth.signInWithCustomToken(firebaseToken);
  }

  public async updateFirebaseUser(user: OidcUser) {
    console.log(user);
    try {
      await this.db
        .collection('authusers')
        .doc(`${user.profile.sub}`)
        .set(user.profile, { merge: true });
    } catch (e) {
      console.log(e);
    }
  }
}

// TODO silent renew https://github.com/auth0-blog/angular-firebase/blob/master/src/app/auth/auth.service.ts

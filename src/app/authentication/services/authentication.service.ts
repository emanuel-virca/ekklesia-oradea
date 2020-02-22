import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { OidcFacade } from 'ng-oidc-client';
import { take, tap, first } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';
import { User } from 'oidc-client';

import { environment } from '@env/environment';

@Injectable()
export class AuthenticationService {
  identity$: Observable<User> = of(null);
  loggedIn$: Observable<boolean> = of(false);

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
    // initialize oidc
    this.oidcFacade.getOidcUser();

    return new Promise(resolve => {
      combineLatest([this.oidcFacade.waitForAuthenticationLoaded(), this.identity$])
        .pipe(
          take(1),
          tap(async ([, identity]) => {
            if (identity && identity.expired) {
              try {
                await this.renewIdentity();
              } catch (error) {
                console.log('error while authenticating user: ', error);

                this.oidcFacade.removeOidcUser();
              } finally {
                resolve();
              }
              return;
            }

            await this.firebaseLogin(identity);
            resolve();
          })
        )
        .subscribe();
    });
  }

  public async renewIdentity() {
    console.log('start silent authentication...');

    const identity = await this.oidcFacade.getUserManager().signinSilent();

    console.log('silent authenticate user success...');

    // do firebase login
    await this.firebaseLogin(identity);
  }

  public signIn() {
    this.oidcFacade.signinRedirect();
  }

  public async signOut() {
    // signout from firebase
    await this.afAuth.signOut();

    // signout from auth0
    this.oidcFacade.signoutRedirect();
  }

  /**
   * Generate new firebase token after the user logged in*
   */
  private async firebaseLogin(identity) {
    if (!identity) {
      return;
    }

    const firebaseUser = await this.afAuth.authState.pipe(first()).toPromise();

    // only loggin if not already logged in
    if (firebaseUser) {
      console.log('user already logged in, skiping firebase login...');
      return;
    }

    const firebaseToken = await this.getFirebaseToken(identity.access_token);

    if (!firebaseToken) {
      return;
    }

    await this.afAuth.signInWithCustomToken(firebaseToken);

    await this.updateFirebaseUser(identity);
  }

  private async getFirebaseToken(accessToken) {
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const token = await this.httpClient
        .get<{ firebaseToken: string }>(environment.api.url + '/auth/firebase', options)
        .toPromise();

      console.log('firebase token retrieved', token);
      return token.firebaseToken;
    } catch (e) {
      console.log('failed to retrieve firebase token', e);
      return null;
    }
  }

  private async updateFirebaseUser(user: User) {
    try {
      await this.db.doc(`users/${user.profile.sub}`).set({ ...user.profile }, { merge: true });
    } catch (e) {
      console.log('error updating firebase user: ', e);
    }
  }
}

// https://medium.com/@jwngr/demystifying-firebase-auth-tokens-e0c533ed330c

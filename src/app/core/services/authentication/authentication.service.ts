import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user$: Observable<User>;
  userRoles: Array<string>; // roles of currently logged in uer

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          /// signed in
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          /// not signed in
          return of(null);
        }
      }));
  }

  doGoogleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    return this.oAuthLogin(provider);
  }

  private async oAuthLogin(provider): Promise<void> {
    return this.afAuth.auth.signInWithPopup(provider).then((credential) => {
      this.updateUserData(credential.user);
    });
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      roles: {
        subscriber: true
      }
    };
    return userRef.set(data, { merge: true });
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }
}

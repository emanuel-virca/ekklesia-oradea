import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import * as firebase from 'firebase/app';

import { User } from '@shared/models/user';

@Injectable()
export class UserService {
  constructor(private afs: AngularFirestore) {}

  public async upgradeAnnonymous(destinationUserId: string, annonymousUserId: string): Promise<void> {
    this.get(annonymousUserId)
      .pipe(take(1))
      .subscribe(async user => {
        const annonymousNotificationTokens = user ? user.notificationTokens || [] : [];

        if (annonymousNotificationTokens.length) {
          await this.afs.doc(`users/${destinationUserId}`).set(
            {
              notificationTokens: firebase.firestore.FieldValue.arrayUnion(annonymousNotificationTokens),
            },
            { merge: true }
          );
        }
      });
  }

  public delete(userId: string): Promise<void> {
    return this.afs.doc(`users/${userId}`).delete();
  }

  public update(user: User): Promise<void> {
    // Sets user data to firestore on login
    return this.afs.doc(`users/${user.uid}`).set(user, { merge: true });
  }

  public get(userId: string): Observable<User> {
    return this.afs.doc<User>(`users/${userId}`).valueChanges();
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';

import { User } from '@shared/models/user.model';
import { take } from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(private afs: AngularFirestore) {}

  public async upgradeAnnonymous(destinationUserId: string, annonymousUserId: string): Promise<void> {
    combineLatest([this.get(destinationUserId), this.get(annonymousUserId)])
      .pipe(take(1))
      .subscribe(async users => {
        const destinationNotificationTokens = users[0] ? users[0].notificationTokens || [] : [];
        const annonymousNotificationTokens = users[1] ? users[1].notificationTokens || [] : [];

        if (annonymousNotificationTokens.length) {
          users[0].notificationTokens = destinationNotificationTokens.concat(
            destinationNotificationTokens.filter(x => annonymousNotificationTokens.indexOf(x) === -1)
          );

          await this.update(users[0]);
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

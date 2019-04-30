import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { User } from '@shared/models/user.model';
import { NotificationTokenService } from '../notification-token/notification-token.service';

@Injectable()
export class UserService {
  constructor(private afs: AngularFirestore, private notificationTokensService: NotificationTokenService) {}

  public async upgradeAnnonymous(destinationUserId: string, annonymousUserId: string): Promise<void> {
    await this.notificationTokensService.copy(destinationUserId, annonymousUserId);
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

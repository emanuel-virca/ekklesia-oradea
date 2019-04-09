import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { NotificationTokenService } from '../notification-token/notification-token.service';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
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

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { User } from '@shared/models/user';

@Injectable()
export class UserService {
  constructor(private afs: AngularFirestore) {}

  public delete(userId: string): Promise<void> {
    return this.afs.doc(`users/${userId}`).delete();
  }

  public update(user: User): Promise<void> {
    // Sets user data to firestore on login
    return this.afs.doc(`users/${user.id}`).set(user, { merge: true });
  }

  public get(userId: string): Observable<User> {
    return this.afs
      .doc<User>(`users/${userId}`)
      .valueChanges()
      .pipe(shareReplay());
  }
}

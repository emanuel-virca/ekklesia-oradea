import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';

import { User } from '@shared/models/user';
import { AuthenticationService } from '@authentication/services/authentication.service';
import { mapItemWithId } from '@core/rxjs/pipes';

@Injectable()
export class UserService {
  currentUser$: Observable<User> = this.authenticationService.identity$.pipe(
    switchMap(user => (user ? this.get(user.profile.sub) : of(null)))
  );

  constructor(private afs: AngularFirestore, private authenticationService: AuthenticationService) {}

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
      .snapshotChanges()
      .pipe(shareReplay(), mapItemWithId);
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireFunctions } from '@angular/fire/functions';

import { UserHistory } from '@shared/models/user-history';
import { UserService } from '@core/services/user/user.service';
import { mapArrayWithId } from '@core/rxjs/pipes';
import { User } from '@shared/models/user';
import { ResourceSnippet } from '@shared/models/resource';

@Injectable({
  providedIn: 'root',
})
export class UserHistoryService {
  constructor(private db: AngularFirestore, private fns: AngularFireFunctions, private userService: UserService) {}

  public getMostRecent(): Observable<UserHistory[]> {
    return this.userService.currentUser$.pipe(
      switchMap(user => (user ? this.getAuthenticatedMostRecent(user) : this.getNotAuthenticatedMostRecent()))
    );
  }

  public async add(resourceId) {
    const callable = this.fns.httpsCallable('addHistory');

    await callable({ resourceId }).toPromise();
  }

  private getAuthenticatedMostRecent(user: User): Observable<UserHistory[]> {
    return this.db
      .collection<UserHistory>(`users/${user.id}/history`, ref => ref.orderBy('dateTime', 'desc').limit(5))
      .snapshotChanges()
      .pipe(mapArrayWithId);
  }

  private getNotAuthenticatedMostRecent(): Observable<UserHistory[]> {
    throw new Error('Method not implemented.');
  }
}

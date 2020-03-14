import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap, tap, shareReplay, take } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { AngularFireFunctions } from '@angular/fire/functions';

import { UserHistory } from '@shared/models/user-history';
import { UserService } from '@core/services/user/user.service';
import { mapArrayWithId } from '@core/rxjs/pipes';
import { User } from '@shared/models/user';
import { AuthenticationService } from '@authentication/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class UserHistoryService {
  private loadingMostRecent = new BehaviorSubject(true);
  private mostRecent$: Observable<UserHistory[]>;

  loadingMostRecent$ = this.loadingMostRecent.asObservable();

  constructor(
    private db: AngularFirestore,
    private fns: AngularFireFunctions,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {}

  public getMostRecent(): Observable<UserHistory[]> {
    if (this.mostRecent$) {
      return this.mostRecent$;
    }

    this.mostRecent$ = this.userService.currentUser$.pipe(
      switchMap(user => (user ? this.getAuthenticatedMostRecent(user) : this.getNotAuthenticatedMostRecent())),
      tap(() => this.loadingMostRecent.next(false)),
      shareReplay()
    );

    return this.mostRecent$;
  }

  public async add(resourceId) {
    const loggedIn = await this.authenticationService.loggedIn$.pipe(take(1)).toPromise();

    if (!loggedIn) {
      return;
    }

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
    return of([]);
  }
}

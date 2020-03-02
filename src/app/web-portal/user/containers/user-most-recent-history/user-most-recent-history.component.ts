import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserHistoryService } from '@web-portal/core/services/user-history/user-history.service';
import { ResourceSnippet } from '@shared/models/resource';
import { AuthenticationService } from '@authentication/services/authentication.service';

@Component({
  selector: 'app-user-most-recent-history',
  templateUrl: './user-most-recent-history.component.html',
  styleUrls: ['./user-most-recent-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMostRecentHistoryComponent implements OnInit {
  mostRecentHistory$: Observable<ResourceSnippet[]> = of([]);
  loading$: Observable<boolean>;
  loggedIn$: Observable<boolean>;

  constructor(private userHistoryService: UserHistoryService, private authenticationService: AuthenticationService) {
    this.mostRecentHistory$ = this.userHistoryService
      .getMostRecent()
      .pipe(map(userHistory => (userHistory ? userHistory.map(x => x.resource) : [])));
    this.loading$ = this.userHistoryService.loadingMostRecent$;
    this.loggedIn$ = this.authenticationService.loggedIn$;
  }

  signIn() {
    this.authenticationService.signIn();
  }

  ngOnInit() {}
}

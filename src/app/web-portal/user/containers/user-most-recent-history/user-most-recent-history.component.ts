import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserHistoryService } from '@web-portal/core/services/user-history/user-history.service';
import { ResourceSnippet } from '@shared/models/resource';

@Component({
  selector: 'app-user-most-recent-history',
  templateUrl: './user-most-recent-history.component.html',
  styleUrls: ['./user-most-recent-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMostRecentHistoryComponent implements OnInit {
  mostRecentHistory$: Observable<ResourceSnippet[]> = of([]);

  constructor(private userHistoryService: UserHistoryService) {
    this.mostRecentHistory$ = this.userHistoryService
      .getMostRecent()
      .pipe(map(userHistory => (userHistory ? userHistory.map(x => x.resource) : [])));
  }

  ngOnInit() {}
}

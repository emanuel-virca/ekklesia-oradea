import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { SearchService } from '../services/search.service';
import { SearchState } from '../services/search-state';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit, OnDestroy {

  searchVisibilitySubscription: Subscription;
  showSearch: boolean;
  user: Observable<firebase.User>;

  constructor(private searchService: SearchService, private authService: AuthenticationService) {
    this.user = authService.user;
  }

  ngOnInit() {
    this.searchVisibilitySubscription = this.searchService.searchState
      .subscribe((state: SearchState) => {
        this.showSearch = state.show;
      });
  }

  ngOnDestroy() {
    this.searchVisibilitySubscription.unsubscribe();
  }

  onStartSearch() {
    this.searchService.show();
  }

  onStopSearch() {
    this.searchService.hide();
  }

  signIn() {
    this.authService.doGoogleSignIn();
  }

  signOut() {
    this.authService.signOut();
  }

  // TODO imitate material search style at https://material.io/tools/icons/?style=baseline

}

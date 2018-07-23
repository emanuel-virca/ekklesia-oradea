import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { SearchService } from '../../../core/services/search/search.service';
import { AuthenticationService } from '../../../core/services/authentication/authentication.service';
import { SearchState } from '../../../core/models/search-state';


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

  getInitials(displayName): string {
    if (!displayName) { return ''; }

    const names = displayName.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }

    return initials;
  }

  // TODO imitate material search style at https://material.io/tools/icons/?style=baseline

}

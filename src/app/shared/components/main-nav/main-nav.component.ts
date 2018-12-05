import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { SearchService } from '../../../core/services/search/search.service';
import { AuthenticationService } from '../../../core/services/authentication/authentication.service';
import { SearchState } from '../../../core/models/search-state';
import { User } from 'src/app/core/models/user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit, OnDestroy {

  searchVisibilitySubscription: Subscription;
  showSearch: boolean;
  user$: Observable<User>;

  constructor(
    private searchService: SearchService,
    private authService: AuthenticationService,
    private router: Router,
  ) {
    this.user$ = authService.user$;
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

  async signOut() {
    await this.authService.signOut();
    this.router.navigateByUrl('');
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

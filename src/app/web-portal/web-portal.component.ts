import { Component, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenav, MatDialog } from '@angular/material';
import { filter, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { AuthorizationService } from '@core/services/authorization/authorization.service';
import * as fromAudioPlayer from '@web-portal/shared/stores/audio-player-store';
import { AuthService } from '@authentication/services/auth/auth.service';

@Component({
  selector: 'app-web-portal',
  templateUrl: './web-portal.component.html',
  styleUrls: ['./web-portal.component.scss'],
})
export class WebPortalComponent {
  navigationItems: { icon: string; name: string; routerLink: string }[] = [
    {
      name: 'Resources',
      icon: 'dashboard',
      routerLink: '/resources',
    },
    {
      name: 'Your Library',
      icon: 'folder',
      routerLink: '/libraries',
    },
    {
      name: 'Contact',
      icon: 'near_me',
      routerLink: '/contact',
    },
  ];
  identity$ = this.authService.identity$;
  displayAdmin$: Observable<boolean>;
  isAudioPlayerVisible$: Observable<boolean>;

  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

  constructor(
    private router: Router,
    private authService: AuthService,
    private authorizationService: AuthorizationService,
    private store: Store<fromAudioPlayer.State>
  ) {
    router.events.pipe(filter(a => a instanceof NavigationEnd)).subscribe({ next: () => this.sidenav.close() });
    this.isAudioPlayerVisible$ = this.store.pipe(select(fromAudioPlayer.getIsAudioPlayerVisible));
    // this.displayAdmin$ = this.authService.firebaseIdentity$.pipe(
    //   switchMap(user => {
    //     return of(this.authorizationService.canAccessAdmin(user));
    //   })
    // );
  }

  signIn() {
    this.authService.signIn();
  }

  async signOut() {
    await this.authService.signOut();

    this.router.navigateByUrl('');
  }
}

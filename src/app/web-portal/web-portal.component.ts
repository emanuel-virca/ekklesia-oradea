import { Component, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { AuthenticationService } from '@core/services/authentication/authentication.service';
import { User } from '@shared/models/user.model';
import { AuthorizationService } from '@core/services/authorization/authorization.service';
import * as fromAudioPlayer from '@web-portal/shared/stores/audio-player-store';

@Component({
  selector: 'app-web-portal',
  templateUrl: './web-portal.component.html',
  styleUrls: ['./web-portal.component.scss'],
})
export class WebPortalComponent {
  navigationItems: { icon: string; name: string; routerLink: string }[] = [
    {
      name: 'Resources',
      icon: 'collections',
      routerLink: '/resources',
    },
    {
      name: 'Contact',
      icon: 'phone',
      routerLink: '/contact',
    },
  ];
  user$: Observable<User>;
  isAudioPlayerVisible$: Observable<boolean>;

  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private authorizationService: AuthorizationService,
    private store: Store<fromAudioPlayer.State>
  ) {
    router.events.pipe(filter(a => a instanceof NavigationEnd)).subscribe({ next: () => this.sidenav.close() });
    this.user$ = authService.user$;
    this.isAudioPlayerVisible$ = this.store.pipe(select(fromAudioPlayer.getIsAudioPlayerVisible));
  }

  signIn() {
    this.authService.doGoogleSignIn();
  }

  async signOut() {
    await this.authService.signOut();

    this.router.navigateByUrl('');
  }

  upgradeAnnonymous() {
    this.authService.linkGoogle();
  }

  shouldDisplayAdmin(user: User) {
    return this.authorizationService.canAccessAdmin(user);
  }
}

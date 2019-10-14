import { Component, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenav, MatDialog } from '@angular/material';
import { filter, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { AuthenticationService } from '@authentication/services/authentication/authentication.service';
import { LoginDialogComponent } from '@authentication/components/login-dialog/login-dialog.component';
import { User } from '@shared/models/user';
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
      name: 'Your Library',
      icon: 'library_books',
      routerLink: '/libraries',
    },
    {
      name: 'Contact',
      icon: 'phone',
      routerLink: '/contact',
    },
  ];
  user$: Observable<User>;
  displayAdmin$: Observable<boolean>;
  isAudioPlayerVisible$: Observable<boolean>;

  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private authorizationService: AuthorizationService,
    private store: Store<fromAudioPlayer.State>,
    private dialog: MatDialog
  ) {
    router.events.pipe(filter(a => a instanceof NavigationEnd)).subscribe({ next: () => this.sidenav.close() });
    this.user$ = authService.user$;
    this.isAudioPlayerVisible$ = this.store.pipe(select(fromAudioPlayer.getIsAudioPlayerVisible));
    this.displayAdmin$ = this.user$.pipe(
      switchMap(user => {
        return of(this.authorizationService.canAccessAdmin(user));
      })
    );
  }

  signIn() {
    this.dialog.open(LoginDialogComponent);
  }

  async signOut() {
    await this.authService.signOut();

    this.router.navigateByUrl('');
  }
}

import { Component, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthenticationService } from '@core/services/authentication/authentication.service';
import { User } from '@shared/models/user.model';
import { AuthorizationService } from '@core/services/authorization/authorization.service';

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

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private authorizationService: AuthorizationService
  ) {
    router.events.pipe(filter(a => a instanceof NavigationEnd)).subscribe({ next: () => this.sidenav.close() });
    this.user$ = authService.user$;
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

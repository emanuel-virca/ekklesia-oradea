import { Component, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { filter } from 'rxjs/operators';
import { MediaObserver } from '@angular/flex-layout';

import { AuthenticationService } from '@authentication/services/authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  navigationItems: { icon: string; name: string; routerLink: string }[] = [
    {
      name: 'Resources',
      icon: 'perm_media',
      routerLink: 'resources',
    },
    {
      name: 'Authors',
      icon: 'people',
      routerLink: 'authors',
    },
    {
      name: 'Web Portal',
      icon: 'apps',
      routerLink: '/resources',
    },
  ];

  identity$ = this.authenticationService.identity$;

  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    public mediaObserver: MediaObserver
  ) {
    router.events
      .pipe(filter(a => a instanceof NavigationEnd))
      .subscribe({ next: () => mediaObserver.isActive('xs') && this.sidenav.close() });
    // https://github.com/angular/flex-layout/issues/1025
    this.mediaObserver.media$.subscribe();
  }

  async signOut() {
    await this.authenticationService.signOut();

    this.router.navigateByUrl('');
  }
}

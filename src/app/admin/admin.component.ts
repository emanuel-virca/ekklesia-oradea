import { Component, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { filter, take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MediaObserver } from '@angular/flex-layout';

import { AuthenticationService } from '@authentication/services/authentication/authentication.service';
import { User } from '@shared/models/user.model';

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
  user$: Observable<User>;

  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

  constructor(private router: Router, private authService: AuthenticationService, public mediaObserver: MediaObserver) {
    this.user$ = authService.user$;
    router.events
      .pipe(filter(a => a instanceof NavigationEnd))
      .subscribe({ next: () => mediaObserver.isActive('xs') && this.sidenav.close() });
    // https://github.com/angular/flex-layout/issues/1025
    this.mediaObserver.media$.subscribe();
  }

  async signOut() {
    await this.authService.signOut();

    this.router.navigateByUrl('');
  }
}

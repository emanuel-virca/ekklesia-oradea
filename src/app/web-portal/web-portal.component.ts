import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '@core/services/authentication/authentication.service';
import { User } from '@shared/models/user.model';
import { AuthorizationService } from '@core/services/authorization/authorization.service';

@Component({
  selector: 'app-web-portal',
  templateUrl: './web-portal.component.html',
  styleUrls: ['./web-portal.component.scss'],
})
export class WebPortalComponent implements OnDestroy {
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
  userSubscription: Subscription;

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(router: Router, authService: AuthenticationService, authorizationService: AuthorizationService) {
    router.events.pipe(filter(a => a instanceof NavigationEnd)).subscribe({ next: () => this.sidenav.close() });
    this.userSubscription = authService.user$.subscribe((user: User) => {
      if (authorizationService.canAccessAdmin(user)) {
        this.navigationItems.push({ name: 'Admin', icon: 'settings', routerLink: '/admin' });
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}

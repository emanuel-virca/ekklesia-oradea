import { Component, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { filter, map } from 'rxjs/operators';

import { AuthorizationService } from '@core/services/authorization/authorization.service';
import { AuthenticationService } from '@authentication/services/authentication.service';
import { AudioPlayerService } from 'app/audio-player/services/audio-player.service';
import { UserHistoryService } from './core/services/user-history/user-history.service';

@Component({
  selector: 'app-web-portal',
  templateUrl: './web-portal.component.html',
  styleUrls: ['./web-portal.component.scss'],
})
export class WebPortalComponent {
  navigationItems: { icon: string; name: string; routerLink: string }[] = [
    {
      name: 'Home',
      icon: 'home',
      routerLink: '/',
    },
    {
      name: 'Resurse',
      icon: 'dashboard',
      routerLink: '/resources',
    },
    {
      name: 'Colecția ta',
      icon: 'folder',
      routerLink: '/libraries',
    },
    {
      name: 'Contact',
      icon: 'near_me',
      routerLink: '/contact',
    },
  ];
  identity$ = this.authenticationService.identity$;
  canAccessAdmin$ = this.authorizationService.canAccessAdmin$;
  isAudioPlayerVisible$ = this.audioPlayerService.trackInfo.audioResource.pipe(map(x => !!x));

  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private authorizationService: AuthorizationService,
    private audioPlayerService: AudioPlayerService,
    private userHistoryService: UserHistoryService
  ) {
    router.events.pipe(filter(a => a instanceof NavigationEnd)).subscribe({ next: () => this.sidenav.close() });
    this.listenToAudioPlayerChanges();
  }

  signIn() {
    this.authenticationService.signIn();
  }

  async signOut() {
    await this.authenticationService.signOut();

    this.router.navigateByUrl('');
  }

  private listenToAudioPlayerChanges() {
    this.audioPlayerService.trackInfo.audioResource.pipe(filter(x => !!x)).subscribe(async audioResource => {
      await this.userHistoryService.add(audioResource.id);
    });
  }
}

import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { filter, take } from 'rxjs/operators';

import { MessagingService } from '@core/services/messaging/messaging.service';
import { AuthenticationService } from '@core/services/authentication/authentication.service';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    public messagingService: MessagingService,
    public auth: AuthenticationService,
    @Inject(PLATFORM_ID) private platformId
  ) {}

  ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.doAnonymousLogin();
    this.initializeMessaging();
  }

  doAnonymousLogin() {
    this.auth.user$.subscribe(user => {
      if (!user) {
        this.auth.doAnonymousLogin();
      }
    });
  }

  initializeMessaging() {
    this.auth.user$
      .pipe(
        filter(user => !!user),
        take(1)
      )
      .subscribe(user => {
        this.messagingService.requestPermission(user);
        this.messagingService.receiveMessage();
      });
  }
}

import { Component, OnInit } from '@angular/core';

import { MessagingService } from './core/services/messaging/messaging.service';
import { AuthenticationService } from './core/services/authentication/authentication.service';
import { User } from './core/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public messagingService: MessagingService, public auth: AuthenticationService) {}

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      if (user) {
        this.initializeMessaging(user);
      } else {
        this.auth.doAnonymousLogin();
      }
    });
  }

  initializeMessaging(user: User) {
    this.messagingService.requestPermission(user);
    this.messagingService.receiveMessage();
    // this.message$ = this.messagingService.currentMessage;
  }
}

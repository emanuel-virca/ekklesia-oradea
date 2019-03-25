import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';

import { environment } from 'src/environments/environment';
import { MessagingService } from './core/services/messaging/messaging.service';
import { AuthenticationService } from './core/services/authentication/authentication.service';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  message$;

  constructor(public messagingService: MessagingService, public auth: AuthenticationService) {}

  ngOnInit() {
    this.auth.user$
      .pipe(
        filter(user => !!user), // filter null
        take(1) // take first real user
      )
      .subscribe(user => {
        if (user) {
          this.messagingService.requestPermission(user);
          this.messagingService.receiveMessage();
          this.message$ = this.messagingService.currentMessage;
        }
      });
  }
}

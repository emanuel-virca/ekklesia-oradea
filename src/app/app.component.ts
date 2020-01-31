import { Component, OnInit } from '@angular/core';

import { MessagingService } from '@core/services/messaging/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public messagingService: MessagingService) {}

  ngOnInit() {
    this.initializeMessaging();
  }

  initializeMessaging() {
    // TODO do this in Revoulut way
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
  }
}

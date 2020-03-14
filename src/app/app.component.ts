import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MessagingService } from '@core/services/messaging/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private swUpdates: SwUpdate, private messagingService: MessagingService) {
    // make the app upgrade itself so that you don’t need to hard refresh every time because of caching of serviceworker
    this.swUpdates.available.subscribe(async _ => {
      await this.swUpdates.activateUpdate();
      document.location.reload();
    });
  }

  ngOnInit() {
    this.messagingService.intializeAsync();
  }
}

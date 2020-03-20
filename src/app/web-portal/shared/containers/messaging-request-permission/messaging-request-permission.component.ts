import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MessagingService } from '@core/services/messaging/messaging.service';

@Component({
  selector: 'app-messaging-request-permission',
  templateUrl: './messaging-request-permission.component.html',
  styleUrls: ['./messaging-request-permission.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagingRequestPermissionComponent {
  requestGranted$ = this.messagingService.subscribed$;
  requestGranting$ = this.messagingService.subscribing$;

  constructor(private messagingService: MessagingService) {}

  async requestPermission() {
    await this.messagingService.requestPermissionAsync();
  }
}

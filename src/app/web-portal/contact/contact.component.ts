import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NotificationsService } from '@core/services/notifications/notifications.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent implements OnInit {
  lei = 'RO89 RZBR 0000 0600 1237 5312';
  usd = 'RO74 RZBR 0000 0600 1678 1807';
  euro = 'RO02 RZBR 0000 0600 1808 9984';

  constructor(private notificationService: NotificationsService) {}

  ngOnInit() {}

  copyIban($event, key) {
    event.preventDefault();
    navigator.clipboard.writeText(key.split(' ').join('')).then(
      () => {
        this.notificationService.success('Contul a fost copiat în clipboard');
      },
      err => {
        console.error('Async: Could not copy text: ', err);
      }
    );
  }
}

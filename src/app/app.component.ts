import { Component, OnInit } from '@angular/core';
import { filter, take } from 'rxjs/operators';

import { MessagingService } from '@core/services/messaging/messaging.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    public messagingService: MessagingService,
    // public auth: AuthenticationService,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    // this.initializeMessaging();
    this.createUser();
  }

  async createUser() {
    try {
      await this.db.collection('ceva').add({ firstName: 'Emanuel' });

      this.db
        .collection('case')
        .get()
        .subscribe(x => {
          console.log(x);
        });
    } catch (e) {
      console.log(e);
    }
  }

  // initializeMessaging() {
  //   this.auth.user$
  //     .pipe(
  //       filter(user => !!user),
  //       take(1)
  //     )
  //     .subscribe(user => {
  //       this.messagingService.requestPermission(user);
  //       this.messagingService.receiveMessage();
  //     });
  // }
}

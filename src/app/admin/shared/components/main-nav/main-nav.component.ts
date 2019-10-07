import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';

import { User } from '@shared/models/user';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainNavComponent {
  @Input() user: User;
  @Output() toggleSidenavEvent = new EventEmitter();
  @Output() signInEvent = new EventEmitter();
  @Output() signOutEvent = new EventEmitter();

  constructor() {}

  toggleSidenav() {
    this.toggleSidenavEvent.emit();
  }

  signOut() {
    this.signOutEvent.emit();
  }
}

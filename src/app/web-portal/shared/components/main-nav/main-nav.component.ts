import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';

import { Identity } from '@authentication/models/identity';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainNavComponent {
  @Input() identity: Identity;
  @Output() toggleSidenavEvent = new EventEmitter();
  @Output() signInEvent = new EventEmitter();
  @Output() signOutEvent = new EventEmitter();

  constructor() {}

  toggleSidenav() {
    this.toggleSidenavEvent.emit();
  }

  signIn() {
    this.signInEvent.emit();
  }

  signOut() {
    this.signOutEvent.emit();
  }
}

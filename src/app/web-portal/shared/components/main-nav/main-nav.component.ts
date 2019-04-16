import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthenticationService } from '@core/services/authentication/authentication.service';
import { User } from '@core/models/user.model';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent {
  user$: Observable<User>;
  @Output() toggleSidenavEvent = new EventEmitter();

  constructor(private authService: AuthenticationService, private router: Router) {
    this.user$ = authService.user$;
  }

  toggleSidenav() {
    this.toggleSidenavEvent.emit();
  }

  signIn() {
    this.authService.doGoogleSignIn();
  }

  anonymousUpgrade() {
    this.authService.linkGoogle();
  }

  async signOut() {
    await this.authService.signOut();
    this.router.navigateByUrl('');
  }

  getInitials(displayName): string {
    if (!displayName) {
      return '';
    }

    const names = displayName.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }

    return initials;
  }
}

import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { Observable, of, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { User, UserRoles } from '@shared/models/user';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthorizationService {
  isAdmin$ = this.userService.currentUser$.pipe(map(user => this.checkAuthorization(user, [UserRoles.Admin])));
  isEditor$ = this.userService.currentUser$.pipe(map(user => this.checkAuthorization(user, [UserRoles.Editor])));

  canAccessAdmin$ = combineLatest([this.isAdmin$, this.isEditor$]).pipe(map(([x, y]) => !!x || !!y));

  constructor(private userService: UserService) {}

  canAccessRoute(route: Route): Observable<boolean> {
    if (route.path === 'admin') {
      return this.canAccessAdmin$;
    }
    return of(false);
  }

  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: UserRoles[]): boolean {
    if (!user || !user.roles) {
      return false;
    }

    for (const role of allowedRoles) {
      if (user.roles.includes(role)) {
        return true;
      }
    }

    return false;
  }
}

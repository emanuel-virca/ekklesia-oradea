import { Injectable } from '@angular/core';
import { Route } from '@angular/router';

import { User, UserRoles } from '@shared/models/user';
import { UserService } from '../user/user.service';
import { AuthenticationService } from '@authentication/services/authentication.service';
import { switchMap, map, filter } from 'rxjs/operators';
import { Observable, of, combineLatest } from 'rxjs';

@Injectable()
export class AuthorizationService {
  user$ = this.authenticationService.identity$.pipe(
    filter(x => !!x),
    switchMap(x => this.userService.get(x.profile.sub))
  );

  isAdmin$ = this.user$.pipe(map(user => this.checkAuthorization(user, [UserRoles.Admin])));
  isEditor$ = this.user$.pipe(map(user => this.checkAuthorization(user, [UserRoles.Editor])));

  canAccessAdmin$ = combineLatest([this.isAdmin$, this.isEditor$]).pipe(map(([x, y]) => !!x || !!y));

  constructor(private userService: UserService, private authenticationService: AuthenticationService) {}

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

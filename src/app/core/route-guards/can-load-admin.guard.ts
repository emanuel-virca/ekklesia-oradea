import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthorizationService } from '@core/services/authorization/authorization.service';
import { AuthenticationService } from '@core/services/authentication/authentication.service';
import { User } from '@shared/models/user.model';

@Injectable()
export class CanLoadAdminGuard implements CanLoad {
  constructor(private authorizationService: AuthorizationService, private authService: AuthenticationService) {}

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.user$.pipe(
      take(1),
      map((user: User) => this.authorizationService.canAccessRoute(user, route))
    );
  }
}

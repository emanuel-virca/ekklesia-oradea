import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthorizationService } from '@core/services/authorization/authorization.service';
import { AuthService } from '@authentication/services/auth/auth.service';

@Injectable()
export class CanLoadAdminGuard implements CanLoad {
  constructor(private authorizationService: AuthorizationService, private authService: AuthService) {}

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.identity$.pipe(
      take(1),
      map((user: any) => true) // this.authorizationService.canAccessRoute(user, route)
    );
  }
}

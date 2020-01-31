import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { AuthorizationService } from '@core/services/authorization/authorization.service';

@Injectable()
export class CanLoadAdminGuard implements CanLoad {
  constructor(private authorizationService: AuthorizationService) {}

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.authorizationService.canAccessRoute(route).pipe(take(1));
  }
}

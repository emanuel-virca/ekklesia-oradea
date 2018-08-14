import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { PermissionsService } from '../../core/services/permissions/permissions.service';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class CanLoadAdmin implements CanLoad {

  constructor(private permissionsService: PermissionsService, private authService: AuthenticationService) { }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.user.pipe( take(1), map((user: firebase.User) => this.permissionsService.canLoadChildren(user, route)));
  }
}

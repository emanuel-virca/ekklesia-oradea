import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class CanActivateAuthGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authenticationService.loggedIn$.pipe(
      take(1),
      tap(isLoggedIn => {
        if (!isLoggedIn) {
          this.authenticationService.signIn();
        }
      })
    );
  }
}

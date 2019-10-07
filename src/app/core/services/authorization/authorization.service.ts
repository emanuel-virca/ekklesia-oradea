import { Injectable } from '@angular/core';
import { Route } from '@angular/router';

import { User } from '@shared/models/user';

@Injectable()
export class AuthorizationService {
  constructor() {}

  isAdmin(user: User): boolean {
    const allowed = ['admin', 'editor', 'subscriber'];
    return this.checkAuthorization(user, allowed);
  }

  isEditor(user: User): boolean {
    const allowed = ['admin', 'editor'];
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  canAccessAdmin(user: User): boolean {
    const allowed = ['admin', 'editor'];
    return this.checkAuthorization(user, allowed);
  }

  canAccessRoute(user: User, route: Route): boolean {
    if (route.path === 'admin') {
      return this.canAccessAdmin(user);
    }
    return false;
  }

  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) {
      return false;
    }

    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }
}

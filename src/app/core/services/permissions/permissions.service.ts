import { Injectable } from '@angular/core';
import { Route } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor() { }

  canLoadChildren(user: firebase.User, route: Route): boolean {
    if (user != null && route.path === 'admin') {
      return user.uid === 'wDPKXWYoMrfrAs5z0bLNSe1WC6C3';
    }
    return false;
  }
}

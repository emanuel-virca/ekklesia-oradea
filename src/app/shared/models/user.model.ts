export interface Roles {
  subscriber?: boolean;
  editor?: boolean;
  admin?: boolean;
}

export interface User {
  uid: string;
  displayName: string;
  email: string;
  roles: Roles;
  notificationTokens?: any;
  isAnonymous: boolean;
  profile?: object;
}

export interface NotificationToken {
  [token: string]: true;
}

import { Roles } from './roles';

export interface User {
  uid: string;
  displayName: string;
  email: string;
  roles: Roles;
  notificationTokens?: string[];
  isAnonymous: boolean;
  profile?: UserProfile;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  id: string;
  email: string;
  picture: string;
  locale?: string;
  name: string;
}

export interface UserSnippet {
  id: string;
  displayName: string;
}

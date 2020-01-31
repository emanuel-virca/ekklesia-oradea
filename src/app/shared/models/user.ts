export interface User {
  id?: string;
  sub: string;
  roles?: UserRoles[];
  email: string;
  email_verified: boolean;
  name: string;
  nickname: string;
  picture: string;
  locale?: string;
}

export interface UserSnippet {
  id: string;
  name: string;
}

export enum UserRoles {
  Subscriber = 'subscriber',
  Editor = 'editor',
  Admin = 'admin',
}

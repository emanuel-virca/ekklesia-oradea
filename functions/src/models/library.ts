import { Image } from './image';
import { UserSnippet } from './user';

export interface Library {
  name: string;
  type: 'likes' | 'userdefined';
  createdBy: UserSnippet;
  createdOn: any;
  thumbnail: Image;
}

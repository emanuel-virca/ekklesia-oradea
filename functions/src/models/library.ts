import { Image } from './image';
import { UserSnippet } from './user';
import { ResourceSnippet } from './resource';

export interface Library {
  name: string;
  type: 'likes' | 'userdefined';
  createdBy: UserSnippet;
  createdOn: any;
  cover: Image;
  published: boolean;
}

export interface LibraryResource {
  resource: ResourceSnippet;
  sortNo: any;
}

export const likesLibraryId = 'likes';

export const librariesCollectionName = 'libraries';

export const libraryResourcesCollectionName = 'library-resources';

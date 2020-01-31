import { ResourceType } from './resource';
import { AuthorSnippet } from './author';
import { Tag } from './tag';

export interface ResourceSearchResult {
  objectID?: string;
  id: string;
  name: string;
  type: ResourceType;
  tags: Tag[];
  author: AuthorSnippet;
  dateTime: any;
}

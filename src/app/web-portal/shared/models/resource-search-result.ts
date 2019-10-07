import { ResourceType } from '@shared/models/resource';
import { Tag } from '@shared/models/tag';
import { AuthorSnippet } from '@shared/models/author';

export interface ResourceSearchResult {
  objectID?: number;
  id: string;
  name: string;
  type: ResourceType;
  tags: Tag[];
  author: AuthorSnippet;
}

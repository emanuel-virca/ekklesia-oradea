import { ResourceType, Tag } from './resource';
import { Author } from './author.model';

export class ResourceSearchResult {
  objectID?: string;
  id: string;
  name: string;
  type: ResourceType;
  tags: Tag[];
  author: Author;
}

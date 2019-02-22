import { ResourceType, Tag } from './resource';

export class ResourceSearchResult {
  objectID?: string;
  id: string;
  name: string;
  type: ResourceType;
  tags: Tag[];
  author: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

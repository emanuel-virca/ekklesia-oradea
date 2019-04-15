import { ResourceType, Tag } from '../../models/resource.model';

export class ResourceSearchResult {
  objectID?: number;
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

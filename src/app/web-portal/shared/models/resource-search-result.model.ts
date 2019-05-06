import { ResourceType } from '@shared/models/resource-type.model';
import { Tag } from '@shared/models/tag.model';

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

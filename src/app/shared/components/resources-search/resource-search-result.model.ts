import { ResourceType } from '../../models/resource.model';
import { Tag } from 'functions/src/models/resource';

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

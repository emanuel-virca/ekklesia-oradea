import { ResourceType } from './resource-type.model';
import { Tag } from './tag.model';
import { Author } from './author.model';

export class Resource {
  id?: string;
  title: string;
  dateTime: any;
  description?: string;
  hearthisId?: string;
  downloadUrl?: string;
  streamUrl?: string;
  imageSrc?: string;
  resourceType: ResourceType;
  author: Author;
  height?: number;
  width?: number;
  published: boolean;
  tags?: Tag[];
}

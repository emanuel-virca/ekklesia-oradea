import { DocumentReference } from '@angular/fire/firestore';

import { ResourceType } from './resource-type.model';
import { Tag } from './tag.model';

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
  author: DocumentReference;
  height?: number;
  width?: number;
  published: boolean;
  tags?: Tag[];
}

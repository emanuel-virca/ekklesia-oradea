import { Resource } from '@shared/models/resource.model';

export class LikedResource {
  userId: string;
  resourceId: string;
  addedOn: any;
  resource?: Resource;
}

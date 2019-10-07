import { Resource } from '@shared/models/resource';

export class LikedResource {
  userId: string;
  resourceId: string;
  addedOn: any;
  resource?: Resource;
}

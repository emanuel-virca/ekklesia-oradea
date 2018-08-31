import { ResourceType } from '../../models/resource.model';

export class ResourceSearchResult {
    objectID?: number;
    id: string;
    name: string;
    type: ResourceType;
    author: {
        id: string,
        firstName: string,
        lastName: string;
    };
}

import { ResourceType } from "./resource";

export class ResourceSearchResult {
    objectID?: string;
    id: string;
    name: string;
    type: ResourceType;
    author: {
        id: string,
        firstName: string,
        lastName: string;
    };
}
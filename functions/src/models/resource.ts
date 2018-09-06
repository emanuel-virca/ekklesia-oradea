export class Resource {
    id?: string;
    title: string;
    dateTime: any;
    description?: string;
    hearthisId?: number;
    downloadUrl?: string;
    imageSrc?: string;
    type: ResourceType;
    author: any; //TODO type
}

export const enum ResourceType {
    Audio = 'audio',
    Video = 'video',
    Article = 'article'
}

export class Resource {
    title: string;
    dateTime: any;
    description: string;
    hearthisId: number;
    imageSrc: string;
    type: ResourceType;
    author: Author;
}

export const enum ResourceType {
    Audio = 'audio',
    Video = 'video',
    Article = 'article'
}

export class Author {
    firstName: string;
    lastName: string;
    avatar: string;
}

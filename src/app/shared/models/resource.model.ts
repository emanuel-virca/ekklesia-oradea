import { SelectOption } from './select-option';
import { Author } from './author.model';


export class Resource {
    title: string;
    dateTime: any;
    description?: string;
    hearthisId?: number;
    imageSrc?: string;
    type: ResourceType;
    author?: Author;
}

export const enum ResourceType {
    Audio = 'audio',
    Video = 'video',
    Article = 'article'
}

export const ResourceTypeSelect: Array<SelectOption> = [
    { text: 'Audio', value: ResourceType.Audio },
    { text: 'Video', value: ResourceType.Video },
    { text: 'Article', value: ResourceType.Article },
];

import { SelectOption } from './select-option';


export class Resource {
    title: string;
    dateTime: any;
    description?: string;
    hearthisId?: number;
    imageSrc?: string;
    type: ResourceType;
    // TODO optimize the doc beeing get from db 
    author: any;
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

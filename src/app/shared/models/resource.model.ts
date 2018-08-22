import { SelectOption } from './select-option';
import { Author } from './author.model';
import { DocumentReference } from 'angularfire2/firestore';


export class Resource {
    id?: string;
    title: string;
    dateTime: any;
    description?: string;
    hearthisId?: number;
    downloadUrl?: string;
    imageSrc?: string;
    type: ResourceType;
    author: DocumentReference;
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

import { DocumentReference } from '@angular/fire/firestore';

import { SelectOption } from './select-option';

export class Resource {
    id?: string;
    title: string;
    dateTime: any;
    description?: string;
    hearthisId?: string;
    downloadUrl?: string;
    imageSrc?: string;
    type: ResourceType;
    author: DocumentReference;
    height?: number;
    width?: number;
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

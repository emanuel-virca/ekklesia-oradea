export class Resource {
  id?: string;
  title: string;
  dateTime: any;
  description?: string;
  hearthisId?: string;
  imageSrc?: string;
  resourceType: ResourceType;
  author: any; //TODO type
  published: boolean;
}

export const enum ResourceType {
  Audio = 'audio',
  Video = 'video',
  Article = 'article',
}

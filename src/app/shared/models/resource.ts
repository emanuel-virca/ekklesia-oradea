import { Tag } from './tag';
import { AuthorSnippet } from './author';
import { Image } from './image';
import { Album } from './album';

export interface Resource {
  id?: string;
  published: boolean;
  type: ResourceType;
  title: string;
  dateTime: any;
  author: AuthorSnippet;
  description?: string;
  hearthisId?: string;
  downloadUrl?: string;
  streamUrl?: string;
  image?: Image;
  tags?: Tag[];
  album?: Album;
  sortNo?: any;
}

export interface ResourceSnippet {
  id?: string;
  published: boolean;
  type: ResourceType;
  title: string;
  dateTime: any;
  author: AuthorSnippet;
  downloadUrl?: string;
  streamUrl?: string;
  image?: Image;
  album?: Album;
  sortNo?: any;
}

export const enum ResourceType {
  Audio = 'audio',
  Video = 'video',
  Article = 'article',
}

export class AudioResource {
  id: string;
  downloadUrl: string;
  streamUrl: string;
  artwork: Image;
  title: string;

  constructor(resource: Resource | ResourceSnippet) {
    if (!resource) {
      return;
    }

    this.id = resource.id;
    this.downloadUrl = resource.downloadUrl;
    this.streamUrl = resource.streamUrl;
    this.artwork = resource.image;
    this.title = resource.title;
  }
}

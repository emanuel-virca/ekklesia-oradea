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
  cover?: Image;
  tags?: Tag[];
  album?: Album;
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
  // TODO rename to cover
  cover?: Image;
  album?: Album;
}

export function convertToResourceSnippet(resource: Resource): ResourceSnippet {
  if (!resource) {
    return null;
  }

  return {
    id: resource.id,
    published: resource.published,
    type: resource.type,
    title: resource.title,
    author: resource.author,
    dateTime: resource.dateTime,
    downloadUrl: resource.downloadUrl || null,
    streamUrl: resource.streamUrl || null,
    cover: resource.cover || null,
    album: resource.album || null,
  };
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
    this.artwork = resource.cover;
    this.title = resource.title;
  }
}

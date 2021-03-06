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
  videoId?: string;
  cover?: Image;
  tags?: Tag[];
  album?: Album;
  viewes: number;
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
  videoId?: string;
  cover?: Image;
  album?: Album;
}

export const resourceSnippetsCollectionName = 'resource-snippets';

export const enum ResourceType {
  Audio = 'audio',
  Video = 'video',
  Article = 'article',
}

export function convertToResourceSnippet(resource: Resource): ResourceSnippet {
  if (!resource) return null;

  return {
    id: resource.id,
    published: resource.published,
    type: resource.type,
    title: resource.title,
    author: resource.author,
    dateTime: resource.dateTime,
    downloadUrl: resource.downloadUrl || null,
    streamUrl: resource.streamUrl || null,
    videoId: resource.videoId || null,
    cover: resource.cover || null,
    album: resource.album || null,
  };
}

export const RESOURCES_STORAGE_FOLDER = 'resources';

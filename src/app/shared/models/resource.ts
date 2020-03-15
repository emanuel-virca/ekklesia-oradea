import { Tag } from './tag';
import { AuthorSnippet } from './author';
import { Image } from './image';
import { Album } from './album';
import { AudioResource } from 'app/audio-player/models/audio-resource';

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
  views?: number;
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
    videoId: resource.videoId || null,
    cover: resource.cover || null,
    album: resource.album || null,
  };
}

export const enum ResourceType {
  Audio = 'audio',
  Video = 'video',
  Article = 'article',
}

export function convertToAudioResource(resource: Resource | ResourceSnippet): AudioResource {
  if (!resource) {
    return;
  }

  return {
    id: resource.id,
    title: resource.title,
    streamUrl: resource.streamUrl,
    artwork: resource.cover ? resource.cover.url : null,
    downloadUrl: resource.downloadUrl,
    author: resource.author.name,
  };
}

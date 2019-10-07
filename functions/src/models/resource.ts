import { AuthorSnippet } from './author';
import { Tag } from './tag';
import { Album } from './album';
import { Image } from './image';

export interface Resource {
  id?: string;
  title: string;
  dateTime: any;
  description?: string;
  hearthisId?: string;
  downloadUrl?: string;
  streamUrl?: string;
  imageSrc?: string;
  resourceType: ResourceType;
  author: AuthorSnippet;
  height?: number;
  width?: number;
  published: boolean;
  tags?: Tag[];
}

export interface ResourceSnippet {
  id?: string;
  type: ResourceType;
  title: string;
  author: AuthorSnippet;
  dateTime: any;
  downloadUrl?: string;
  streamUrl?: string;
  image?: Image;
  album?: Album;
}

export const enum ResourceType {
  Audio = 'audio',
  Video = 'video',
  Article = 'article',
}

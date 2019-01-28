import { Resource } from './resource.model';

export class AudioResource {
    id: string;
    downloadUrl: string;
    streamUrl: string;
    artwork: string;
    title: string;

    constructor(resource: Resource) {
        if (!resource) { return; }

        this.id = resource.id;
        this.downloadUrl = resource.downloadUrl;
        this.streamUrl = resource.streamUrl;
        this.artwork = resource.imageSrc;
        this.title = resource.title;
    }
}

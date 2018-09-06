import * as algoliasearchProxy from 'algoliasearch';

import { AlgoliaConfig } from './algolia.config';
import { Resource } from './models/resource';
import { ResourceSearchResult } from './models/resource-search-result';
import { Author } from './models/author.model';


export class ResourceSearchService {

    private algoliaIndex: algoliasearchProxy.Index;

    constructor(algoliaConfig: AlgoliaConfig) {
        const client = algoliasearchProxy(algoliaConfig.applicationId, algoliaConfig.adminApiKey);
        this.algoliaIndex = client.initIndex(algoliaConfig.resourceIndex);
    }

    public async addAsync(resource: Resource): Promise<algoliasearchProxy.Task> {
        const resourceSearchResult = await this.mapResourceToResourceSearchResultAsync(resource);

        return await this.algoliaIndex.addObject(resourceSearchResult);
    }

    public async updateAsync(resource: Resource): Promise<algoliasearchProxy.Task> {
        const existingResourceSearchResult = await this.algoliaIndex.getObject(resource.id) as ResourceSearchResult;

        if (!existingResourceSearchResult) {
            return await this.addAsync(resource);           
        }

        const resourceSearchResult = await this.mapResourceToResourceSearchResultAsync(resource);        

        return await this.algoliaIndex.saveObject(resourceSearchResult);
    }

    public async updateByAuthorAsync(author: Author): Promise<algoliasearchProxy.Task> {
        const response = await this.algoliaIndex.search(author.id);

        if (!response.hits && !response.hits.length) {
            return null;
        }

        const resourceSearchResults = [];

        response.hits.forEach((resourceSearchResult: ResourceSearchResult) => {
            resourceSearchResult.author.firstName = author.firstName;
            resourceSearchResult.author.lastName = author.lastName;
            resourceSearchResults.push(resourceSearchResult);
        })

        return await this.algoliaIndex.saveObjects(resourceSearchResults);
    }

    public async deleteAsync(resourceId: string): Promise<void> {
        await this.algoliaIndex.deleteObject(resourceId)
    }

    private async mapResourceToResourceSearchResultAsync(resource: Resource): Promise<ResourceSearchResult> {
        const authorDocumentSnapshot = await resource.author.get();

        const author = authorDocumentSnapshot.data() as Author;
        author.id = authorDocumentSnapshot.id;

        return {
            objectID: resource.id,
            id: resource.id,
            name: resource.title,
            type: resource.type,
            author: {
                id: author.id,
                firstName: author.firstName,
                lastName: author.lastName,
            }
        };
    }
}

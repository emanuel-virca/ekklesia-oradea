import * as algoliasearchProxy from 'algoliasearch';

import { AlgoliaConfig } from './algolia.config';
import { Resource } from './models/resource';
import { ResourceSearchResult } from './models/resource-search-result';
import { Author, convertToAuthorSnippet } from './models/author';

export class ResourceSearchService {
  private algoliaIndex: algoliasearchProxy.Index;

  constructor(algoliaConfig: AlgoliaConfig) {
    const client = algoliasearchProxy(algoliaConfig.applicationId, algoliaConfig.adminApiKey);
    this.algoliaIndex = client.initIndex(algoliaConfig.resourceIndex);
  }

  public async addAsync(resource: Resource): Promise<algoliasearchProxy.Task> {
    console.log('search: adding ' + resource.title + ': ', JSON.stringify(resource));

    return await this.algoliaIndex.addObject(this.mapResourceToResourceSearchResult(resource));
  }

  public async updateAsync(resource: Resource): Promise<algoliasearchProxy.Task> {
    console.log('search: updating ' + resource.title + ': ', JSON.stringify(resource));

    return await this.algoliaIndex.saveObject(this.mapResourceToResourceSearchResult(resource));
  }

  public async updateByAuthorAsync(author: Author): Promise<algoliasearchProxy.Task> {
    const response = await this.algoliaIndex.search(author.id);

    if (!response.hits && !response.hits.length) {
      return null;
    }

    const resourceSearchResults = response.hits.map((resourceSearchResult: ResourceSearchResult) => {
      resourceSearchResult.author = convertToAuthorSnippet(author);
      return resourceSearchResult;
    });

    return await this.algoliaIndex.saveObjects(resourceSearchResults);
  }

  public async deleteAsync(resourceId: string): Promise<void> {
    await this.algoliaIndex.deleteObject(resourceId);
  }

  private mapResourceToResourceSearchResult(resource: Resource): ResourceSearchResult {
    return {
      objectID: resource.id,
      id: resource.id,
      name: resource.title,
      type: resource.type,
      tags: resource.tags,
      author: resource.author,
      dateTime: resource.dateTime,
    };
  }
}

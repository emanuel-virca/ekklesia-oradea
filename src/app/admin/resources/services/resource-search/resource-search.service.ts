import { Injectable } from '@angular/core';
import * as algoliasearchProxy from 'algoliasearch';

import { environment } from '../../../../../environments/environment';
import { ResourceSearchResult } from '../../../../shared/components/resources-search/resource-search-result.model';
import { Author } from '../../../../shared/models/author.model';
import { Resource } from '../../../../shared/models/resource.model';

@Injectable({
  providedIn: 'root'
})
export class ResourceSearchService {

  private algoliaIndex: algoliasearchProxy.Index;

  constructor() {
    const client = algoliasearchProxy(environment.algolia.applicationId, environment.algolia.adminApiKey);
    this.algoliaIndex = client.initIndex(environment.algolia.resourceIndex);
  }

  public async addAsync(resource: Resource): Promise<string> {
    const resourceObject = await this.mapResourceToResourceSearchResultAsync(resource);

    return await this.algoliaIndex.addObject(resourceObject).then(function (responses) {
      return responses.objectID;
    });
  }

  public async updateAsync(resource: Resource): Promise<void> {
    const response = await this.algoliaIndex.search(resource.id);

    if (!response.hits && !response.hits.length) {
      await this.addAsync(resource);
      return;
    }

    const existingResourceObject = response.hits[0] as ResourceSearchResult;

    const resourceObject = await this.mapResourceToResourceSearchResultAsync(resource);

    resourceObject.objectID = existingResourceObject.objectID;

    await this.algoliaIndex.saveObject(resourceObject);
  }

  private async mapResourceToResourceSearchResultAsync(resource: Resource): Promise<ResourceSearchResult> {
    const authorDocumentSnapshot = await resource.author.get();

    const author = authorDocumentSnapshot.data() as Author;
    author.id = authorDocumentSnapshot.id;

    return {
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

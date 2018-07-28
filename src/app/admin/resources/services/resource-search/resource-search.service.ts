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

    const authorDocumentSnapshot = await resource.author.get();

    const author = authorDocumentSnapshot.data() as Author;

    const resourceObject: ResourceSearchResult = {
      id: resource.id,
      name: resource.title,
      type: resource.type,
      author: {
        firstName: author.firstName,
        lastName: author.lastName,
      }
    };

    return await this.algoliaIndex.addObject(resourceObject).then(function (responses) {
      return responses.objectID;
    });
  }
}

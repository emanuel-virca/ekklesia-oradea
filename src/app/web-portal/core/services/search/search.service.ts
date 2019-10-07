import { Injectable } from '@angular/core';
import * as algoliasearchProxy from 'algoliasearch';

import { environment } from '@env/environment';
import { ResourceSearchResult } from '@web-portal/shared/models/resource-search-result';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private algoliaIndex: algoliasearchProxy.Index;

  constructor() {
    const client = algoliasearchProxy(environment.algolia.applicationId, environment.algolia.apiKey);
    this.algoliaIndex = client.initIndex(environment.algolia.resourceIndex);
  }

  public searchResourcesAsync(search: string, pageNo: number, pageSize: number): Promise<ResourceSearchResult[]> {
    return this.algoliaIndex.search({ query: search, page: pageNo, hitsPerPage: pageSize }).then(responses => {
      return responses.hits;
    });
  }
}

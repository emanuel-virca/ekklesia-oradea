import { Injectable } from '@angular/core';
import * as algoliasearchProxy from 'algoliasearch';

import { environment } from '../../../environments/environment';
import { ResourceSearchResult } from '../models/resource-search-result.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  algoliaIndex: algoliasearchProxy.Index;

  constructor() {
    const client = algoliasearchProxy(environment.algolia.applicationId, environment.algolia.apiKey);
    this.algoliaIndex = client.initIndex('getstarted_actors');
  }

  public searchResourcesAsync(search: string, pageNo: number, pageSize: number): Promise<ResourceSearchResult[]> {
    return this.algoliaIndex.search({ query: search, page: pageNo, hitsPerPage: pageSize }).then(function (responses) {
      return responses.hits;
    });
  }
}

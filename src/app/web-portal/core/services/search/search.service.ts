import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import * as algoliasearchProxy from 'algoliasearch';

import { environment } from '@env/environment';
import { ResourceSearchResult } from '@web-portal/shared/models/resource-search-result.model';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private algoliaIndex: algoliasearchProxy.Index;

  constructor(@Inject(PLATFORM_ID) private platformId) {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    const client = algoliasearchProxy(environment.algolia.applicationId, environment.algolia.apiKey);
    this.algoliaIndex = client.initIndex(environment.algolia.resourceIndex);
  }

  public async searchResourcesAsync(search: string, pageNo: number, pageSize: number): Promise<ResourceSearchResult[]> {
    if (!this.algoliaIndex) {
      return;
    }

    const responses = await this.algoliaIndex.search({ query: search, page: pageNo, hitsPerPage: pageSize });

    return responses.hits;
  }
}

import { Injectable } from '@angular/core';
import * as algoliasearchProxy from 'algoliasearch';
import { Subject } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ResourceSearchResult } from '../../../shared/components/resources-search/resource-search-result.model';
import { SearchState } from '../../models/search-state';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private algoliaIndex: algoliasearchProxy.Index;
  private searchVisibilitySubject = new Subject<SearchState>();

  public searchState = this.searchVisibilitySubject.asObservable();

  constructor() {
    const client = algoliasearchProxy(environment.algolia.applicationId, environment.algolia.apiKey);
    this.algoliaIndex = client.initIndex('getstarted_actors');
  }

  public searchResourcesAsync(search: string, pageNo: number, pageSize: number): Promise<ResourceSearchResult[]> {
    return this.algoliaIndex.search({ query: search, page: pageNo, hitsPerPage: pageSize }).then(function (responses) {
      return responses.hits;
    });
  }

  show() {
      this.searchVisibilitySubject.next(<SearchState>{ show: true });
  }

  hide() {
      this.searchVisibilitySubject.next(<SearchState>{ show: false });
  }
}

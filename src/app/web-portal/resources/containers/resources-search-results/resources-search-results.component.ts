import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchService } from '@web-portal/core/services/search/search.service';
import { ResourceSearchResult } from '@web-portal/shared/models/resource-search-result';

@Component({
  selector: 'app-resources-search-results',
  templateUrl: './resources-search-results.component.html',
  styleUrls: ['./resources-search-results.component.scss'],
})
export class ResourcesSearchResultsComponent implements OnInit {
  searchResults: Array<ResourceSearchResult>;
  currentPage = 0;
  pageSize = 50;
  loading = false;
  thereIsMore = true;
  searchQuery = '';

  constructor(private searchService: SearchService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(x => {
      this.initSearch();
      this.searchQuery = x.get('search_query');
      this.getNextResultsAsync();
    });
  }

  ngOnInit() {}

  async getNextResultsAsync() {
    this.loading = true;

    try {
      const pagedSearchResult = await this.searchService.searchResourcesAsync(
        this.searchQuery,
        this.currentPage,
        this.pageSize
      );

      this.searchResults = this.searchResults.concat(pagedSearchResult);

      console.log(pagedSearchResult);

      if (pagedSearchResult.length < this.pageSize) {
        this.thereIsMore = false;
      }

      this.currentPage++;
    } catch (e) {}

    this.loading = false;
  }

  onScroll() {
    if (!this.loading && this.thereIsMore) {
      this.getNextResultsAsync();
    }
  }

  toDateTime(secs) {
    const t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
  }

  get initialLoading() {
    return this.currentPage === 0;
  }

  private initSearch() {
    this.thereIsMore = true;
    this.currentPage = 0;
    this.loading = false;
    this.searchResults = new Array<ResourceSearchResult>();
    // TODO cancel current search
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchService } from '../../shared/services/search.service';
import { LoaderService } from '../../shared/loader/loader.service';
import { ResourceSearchResult } from '../../shared/components/resources-search/resource-search-result.model';

@Component({
  selector: 'app-resources-search-results',
  templateUrl: './resources-search-results.component.html',
  styleUrls: ['./resources-search-results.component.css']
})
export class ResourcesSearchResultsComponent implements OnInit {

  searchResults = new Array<ResourceSearchResult>();
  currentPage = 0;
  pageSize = 50;
  loading = false;
  thereIsMore = true;
  searchQuery = '';

  constructor(private searchService: SearchService, private route: ActivatedRoute, private loaderService: LoaderService) {
    this.searchQuery = this.route.snapshot.paramMap.get('search_query');
  }

  ngOnInit() {
    this.getNextResultsAsync();
  }

  async getNextResultsAsync() {
    this.loading = true;
    this.loaderService.show();

    try {
      const pagedSearchResult = await this.searchService.searchResourcesAsync(this.searchQuery, this.currentPage, this.pageSize);

      this.searchResults = this.searchResults.concat(pagedSearchResult);

      if (pagedSearchResult.length < this.pageSize) {
        this.thereIsMore = false;
      }

      this.currentPage++;

    } catch (e) { }

    this.loading = false;
    this.loaderService.hide();
  }

  onScroll() {
    if (!this.loading && this.thereIsMore) {
      this.getNextResultsAsync();
    }
  }
}

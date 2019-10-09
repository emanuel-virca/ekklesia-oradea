import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { SearchService } from '@web-portal/core/services/search/search.service';
import { LoaderService } from '@core/services/loader/loader.service';
import { ResourceSearchResult } from '@web-portal/shared/models/resource-search-result';
import { ResourcesService } from '@web-portal/core/services/resources/resources.service';
import { Resource, AudioResource } from '@shared/models/resource';

import * as fromAudioPlayer from '@web-portal/shared/stores/audio-player-store';
import * as fromAudioPlayerActions from '@web-portal/shared/stores/audio-player-store/audio-player.actions';

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

  constructor(
    private searchService: SearchService,
    private resourcesService: ResourcesService,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private store: Store<fromAudioPlayer.State>
  ) {
    this.route.paramMap.subscribe(x => {
      this.initSearch();
      this.searchQuery = x.get('search_query');
      this.getNextResultsAsync();
    });
  }

  ngOnInit() {}

  async getNextResultsAsync() {
    this.loading = true;
    this.loaderService.show();

    try {
      const pagedSearchResult = await this.searchService.searchResourcesAsync(
        this.searchQuery,
        this.currentPage,
        this.pageSize
      );

      this.searchResults = this.searchResults.concat(pagedSearchResult);

      if (pagedSearchResult.length < this.pageSize) {
        this.thereIsMore = false;
      }

      this.currentPage++;
    } catch (e) {}

    this.loading = false;
    this.loaderService.hide();
  }

  onScroll() {
    if (!this.loading && this.thereIsMore) {
      this.getNextResultsAsync();
    }
  }

  public onResourceClick(resourceSearchResult: ResourceSearchResult) {
    if (resourceSearchResult == null) {
      return;
    }

    this.resourcesService.getById(resourceSearchResult.id).subscribe((resource: Resource) => {
      if (resource.streamUrl) {
        this.store.dispatch(new fromAudioPlayerActions.Select(new AudioResource(resource)));
      }
    });
  }

  private initSearch() {
    this.thereIsMore = true;
    this.currentPage = 0;
    this.loading = false;
    this.searchResults = new Array<ResourceSearchResult>();
    // TODO cancel current search
  }
}

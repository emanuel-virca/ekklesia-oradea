import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchService } from '../../core/services/search/search.service';
import { LoaderService } from '../../core/services/loader/loader.service';
import { ResourceSearchResult } from '../../shared/components/resources-search/resource-search-result.model';
import { AudioPlayerService } from '../../core/services/audio-player/audio-player.service';
import { ResourceService } from '../../shared/services/resource/resource.service';
import { Resource } from 'src/app/shared/models/resource.model';
import { AudioResource } from '../../shared/models/audio-resource.model';

@Component({
  selector: 'app-resources-search-results',
  templateUrl: './resources-search-results.component.html',
  styleUrls: ['./resources-search-results.component.scss']
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
    private resourceService: ResourceService,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private audioPlayerService: AudioPlayerService,
  ) {
    this.route.paramMap.subscribe((x) => {
      this.initSearch();
      this.searchQuery = x.get('search_query');
      this.getNextResultsAsync();
    });
  }

  ngOnInit() {

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

  public onResourceClick(resourceSearchResult: ResourceSearchResult) {
    if (resourceSearchResult == null) { return; }

    this.resourceService.get(resourceSearchResult.id)
      .subscribe((resource: Resource) => {
        if (resource.streamUrl) {
          this.audioPlayerService.play(new AudioResource(resource));
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

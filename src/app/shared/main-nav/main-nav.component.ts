import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { SearchService } from '../services/search.service';
import { SearchState } from '../services/search-state';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit, OnDestroy {

  searchVisibilitySubscription: Subscription;
  showSearch: boolean;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.searchVisibilitySubscription = this.searchService.searchState
      .subscribe((state: SearchState) => {
        this.showSearch = state.show;
      });
  }

  ngOnDestroy() {
    this.searchVisibilitySubscription.unsubscribe();
  }

  onStartSearch() {
    this.searchService.show();
  }

  onStopSearch() {
    this.searchService.hide();
  }

  // TODO imitate material search style at https://material.io/tools/icons/?style=baseline

}
